---
title: "Liquid Rocket Software"
summary: "Programming a 65k ft LOX-Ethanol rocket"
coverImage: "/assets/b4.JPG"
order: -1
---

**A photo of the Bang Bang Boom Box (B⁴), our hardware testing apparatus**

**Take a look at [the avionics system design](/projects/cms-avi-hw) and
[PSPieChart](/projects/pspiechart) posts to get context on this document.**

This document is a direct continuation of Avionics System Design and details information about flight and GSE software for Purdue Space Program Liquid's next rocket, the CraterMaker Special.

## Flight Software

### Development Environment

The RP2040 has a very well-documented and easy-to-use SDK written in C.
Everything can be configured through CMake.

The first step to start developing software for the rocket was determining the
source tree organization and writing a build system.

We used CMake since that's what the Pico SDK supported. The build process also
includes `ccache` for fast clean builds, since incremental builds were finnicky
to get working correctly.

This is how the source code is organized

```
PSPL_CMS_Avionics_Code/
├── README.md <- This file
├── src/ <- contains main programs for each board
│   └── someprogram/ <- Main program folder, i.e., for a board
│       ├── someprogram.h <- All header stuff for this program
│       ├── main.c <- Contains the entrypoint
│       └── other.c <- Other source files
├── lib/ <- common libraries shared by all boards
│   └── example/ <- example library
│       ├── example.c
│       └── include/ <- header files, added to include path
│           ├── example.h <- top level header, included with `#include <example.h>`
│           └── example/ <- secondary headers
│               └── whatever.h <- included with `#include <example/whatever.h>`
├── external/ <- gitignore'd, for Pico SDK, FreeRTOS, etc.
├── include/ <- Global include directory, used for configs and stuff
├── build/ <- not uploaded to the repo, contains compilation outputs
│   └── bin/ <- contains the files to be uploaded to the boards
├── .clang-format <- file containing autoformatter rules
├── .gitignore <- file containing things to not be uploaded to GitHub
├── Doxyfile <- Doxygen Documentation Generator Configs, mostly autogenerated
├── CMakeLists.txt <- Main build script
└── Makefile <- User-friendly build script, calls CMake
```

Finally, there's a top-level `Makefile` which handles dependencies, compilation,
and generating the compilation database (for intellisense)

Though Doxygen _is_ used for generating documentation, it's not commonly
used, and we usually just refer to the docstrings.

The dependencies for flight software development are very minimal, needing only
ARM GCC and newlib to get started. As of writing this, a cold build takes about
15 seconds, which offers a fast feedbcak loop.

### Peripheral I/O

The main peripherals on this rocket are ADCs, storage devices, radios, Ethernet
(more on this later), and digital output for pyro channels.

Digital outputs are easy enough, pico-sdk has all the infrastructure
needed for that.

One of the requirements we have for peripherals on the rocket, which most of our
selected parts comply, is that they communicate over SPI.

SPI is a fantastic protocol and can be abstracted away to the level of
selecting a peripheral, and sending and receiving a bitstream to the peripheral
at a specified rate.

The process of writing the drivers themselves is mostly straightforward -
implement the protocols that the chip manufacturers specify in the datasheet.

Early versions of peripheral drivers were written with slow polling, and
using CPU to copy to I/O ports.

This was done for initial testing, but we soon adopted FreeRTOS, wrote a
DMA-based SPI implementation. Drivers for high-bandwidth devices like flash
and Ethernet were also switched to use interrupts for checking command completion.

**Fun fact: the RP2040's DMA system is turing complete. More info
[here](https://hackaday.com/2023/01/20/help-needed-on-thumb-image-rp2040-dma-hack-makes-another-cpu-core/)**

### Network Stack

The network stack was nicely handled for us by the W5500 chip, which is
what we use to add Ethernet capability to the RP2040. Communicating
over SPI, it includes a hardwired TCP/IP stack, with 6 sockets.

All we need to do is write a driver to access this functionality, and
abstract away details such as socket creation, buffer management,
configuration, etc. I won't be going into much detail about this driver,
but you can read the datasheet for the chip [here](https://cdn.sparkfun.com/datasheets/Dev/Arduino/Shields/W5500_datasheet_v1.0.2_1.pdf)

The chip negotiates 100Base-T, but has a bandwidth limit of 15Mbps, though
this was enough for our needs.

### Communication Protocols

![CMS communication lines](/assets/cms-comm-lines.png)
_This is where the fun begins_

At the launch site, the rocket, the GSE system (Black Cat Launch System, aka BCLS),
and the launch operators' computers are all connected over Ethernet.

While the rocket is on the ground, there are two primary requirements for
communication with the rocket.

- We need live sensor data to be available to operators
- We need remote procedure call capability

The EMU board is fully responsible for the launch countdown and autosequence of
this rocket, so RPC capability is important.

But first - how do we stream sensor data from the boards to each other and
the ground?

My solution - **SensorNet**. The concept is very simple, it starts with this
struct definition.

#### SensorNet

```c
typedef struct {
  u16 sensor_id; // globally unique
  u64 time; // microseconds since UNIX epoch
  u64 counter; // per sensor
  i64 data;
} sensornet_packet_t;
```

The system is very straightforward - take one or more of these packets, put them
on a UDP packet, and send them on their merry way.

Decoding is simple enough. If it's another flight board decoding, it just has to
cast the packet it read to `sensornet_packet_t*`. On the ground side, just
manually decode the binary data. There are plenty of libraries for most
programming libraries to handle this.

Doing things this way has the blazing fast serialization time of _**0 ms**_.

On the networking side of this - each flight board (EMU, LFC, UFC), has a
UDP multicast group IP assigned to it, and any devices interested in data from
that board can simply open a socket listening to that multicast IP.

#### Time

The SensorNet timestamp is relative to the UNIX epoch, which means that the
rocket needs a way of figuring out when UNIX epoch is. To get the time, we
wrote a simple NTP client that gets the time from BCLS, which hopefully
has a working RTC battery, or an internet connection (we bring a LTE modem
to the launch site, and might bring Starlink if the business team doesn't
make a fuss).

#### CommandNet

Now this is slightly more complicated.

I concluded that we need two features from CommandNet

- The ability to directly set the values of certain variables
- The ability to call functions that don't have any parameters.

I see this as basically a more complicated version of the "set registers, run
command" model.

In order to simplify the implementation of both sides of this protocol, I
decided to go with MessagePack, which is a JSON-like binary format for
serializing information. Neither throughput nor latency (< 10ms is acceptable)
was an important factor for this application, so we prioritized simplicity.
These packets would then be sent over a TCP connection to the rocket.

This is the protocol "spec":

```
Request-response protocol for sending commands over a TCP socket
Request format:

[request type(u8), args...]
EXEC_CMD: [EXEC_CMD, command name]
ALL_CMDS: [ALL_CMDS]
SET_VAR: [SET_VAR, variable name, value]
GET_VAR: [GET_VAR, variable name]
ALL_VARS: [ALL_VARS]

Response format:
[status(u8), args...]
EXEC_CMD: [status(SUCCESS/ERROR)]
ALL_CMDS: [status(SUCCESS/ERROR), [command 0 name, ...]]
SET_VAR: [status(SUCCESS/ERROR), old value]
GET_VAR: [status(SUCCESS/ERROR), value]
ALL_VARS: [status(SUCCESS/ERROR), [[var 0 name, var 0 value], ...]]
```

All names are strings (I know, strings are evil), and all values are 64-bit
integers. There is no backward compatability, it's an unstable protocol, and
you better have the right version of the client.

A full CommandNet exchange would take place as follows:

```
+---------+             +---------+
| Client  |             | Rocket  |
+---------+             +---------+
     |                       |
     | Open TCP Socket       |
     |---------------------->|
     |                       |
     | Send request          |
     |---------------------->|
     |                       |
     |         Send response |
     |<----------------------|
     |                       |
     |      Close TCP Socket |
     |<----------------------|
     |                       |
+---------+             +---------+
| Client  |             | Rocket  |
+---------+             +---------+
```

The way the network at the launch site is set up, it's possible that
people outside our team can plug into the network and send packets to the
rocket - this isn't a problem we expect to encounter, but it's one we have to be
ready for anyway.

To solve this, we simply add AES256-CBC symmetric key encryption, with a key
derived from a passphrase.

Now, instead of sending the bare MessagePack encoded packet, we send a
base64-encoded ciphertext. The reason to use base64 rather than a binary
stream is so we can delimit exchanges with newlines - just made implementation
easier.

### EMU State Machine

The state machine is a failsafe method of performing launch control.
Interacting with this state machine is the primary objective of CommandNet. It
looks like this:

![EMU State Machine](/assets/emu-state-machine.png)

Most of the time launch will be spent in the Countdown - Go/No Go loop.

At preset points in the countdown, the launch operators will need to issue a
Go/No Go to the current poll. If the poll either times out or a "No Go" is
issued, the countdown is placed on hold until manual intervention.

The countdown also automatically goes on hold if there's an off-nominal
situation. Any OS faults, off-nominal readings, etc., can place the countdown
on hold.

If all goes well and the final poll is answered, the state machine goes into
autosequence at a set point in the countdown (T-auto).

Due to the final poll, the rocket cannot launch if communication is lost
before T-auto. If communication is lost after T-auto, the rocket will continue
with ignition. This isn't a concern since we lose command capability after
launch anyway.

The autosequence phase contains the ignition sequence. A manual abort can be
issued during the autosequence, which would place the vehicle in a safe state.

### DevOps

Back to the boring stuff.

All this software needs to be tested on actual hardware, and it's inconvenient
and expensive for everyone working on software to have test hardware.

To solve this problem, [Taylor](https://www.duchinskiprojects.com/cms-avionics)
devised the Bang Bang Boom Box, the picture at the start of this page.

The box contains a Raspberry Pi which is connected to whatever board is
currently being worked on, through USB and GPIO lines to the RESET and BOOTSEL
pins (for whatever reason, he chose to do this instead of buying a $5 [picoprobe](https://www.raspberrypi.com/products/debug-probe/)).

The source files include simple scripts which can then flash binaries to the
board. The RP2040 has a UF2 ROM bootloader, so when it's RESET with BOOTSEL held
active, it shows up as a USB storage device, and the firmware file can be copied
into it to write it to device flash.

The flight software can be compiled either on the Pi itself or copied over.

The Pi is added to a [Tailscale](https://tailscale.com/) network, which is a Mesh
VPN, so we could work on developing avionics when we were off doing internships
over the summer.

## GSE Software

This basically comes down to implementing everything in this data path diagram.

![Data Path Diagram](/assets/data-path-diagram.png)

Every maroon block in this image is a separate piece of software that needs to
be written.

These are the ones with development underway

### PSPieChart

[See this post](/projects/pspiechart)

### SensorNet Server

This is a very crucial piece of software with this core requirement

- Log every single SensorNet packet that hits its socket

We selected NodeJS as the platform for this because it made it easy to integrate
REST endpoints for setting and retrieving sensor calibrations, and to add
WebSocket support so that packets can be forwarded to PSPieChart.

This server includes endpoints to configure sensor ID to name mappings,
calibrations, custom expressions for derived data, and retrieval of historical
data.

We initially picked InfluxDB to store the sensor data. However, we found that Influx
sucks for this use case. The buffer to insert points had to be somewhat large without incurring
a penalty on the insert throughput. Latency to retrieve past data was high.

Given these challenges, I
[decided to write my own "database"](https://github.com/sagarreddypatil/tsdb-cpp)
(I'll probably make a separate post about this later). It's not ACID-compliant (yet) so it's not
fair to call it a true database, but it got the job done.

The concept is simple, just memory map a file to a petabyte sized chunk of the address space,
and just insert points to the tail end of the file and have a counter in the file header. Add some
basic file versioning capabilities, and you have a database.

Now that I think about it, I think it could be considered atomic inserts are single threaded
(per table) and there's a counter keeping track of inserted points which *should* ensure atomicity.

In any case, this database automatically buffered writes through the magic of Linux's VFS, and
the latency to retrieve past points is really low since it doesn't force you to do any sort
of reduction, and can instead just sample points at a fixed time interval. One of the reasons
Influx retrival was slow was becuase it forced you to apply some sort of reduction (`max`, `min`,
`avg`, etc.)


### CommandNet Server

This is just a Python implementation of the protocol, with a REST API.

## Talk is cheap, show me the code

Here's an old snapshot of the [flight software](https://github.com/sagarreddypatil/PSPL_CMS_FlightSoftware) and [GSE software](https://github.com/sagarreddypatil/PSPL_CMS_GSESoftware). Current versions are private.
