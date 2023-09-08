---
title: "Model rocket test stand"
summary: "Cheap and easy way to characterize your rocket motors!"
coverImage: "/assets/IMG_3572.JPG"
order: 4
---

Summer after high school, I was bored and jobless, so I decided to build and test custom solid rocket motors (yes, sugar rockets, no do not try this at home), so I built a test stand to measure the thrust of motors.

To achieve this, I used a load cell along with an ESP 8266 microcontroller, to read the load cell and transmit the data.

All the code that runs on the ESP was written in C++ using the Arduino ecosystem.

The program on the ESP was responsible for reading the data from the load cell, storing the data in SPIFFS, sending data over TCP to connected clients, and broadcasting mDNS.

An Electron app was created to receive and visualize the data. The Electron app used mDNS to find the IP address of the ESP, and then received data on a TCP socket. It uses uPlot to graph the data in real time, and also records the data.

Finally, it includes an interface to perform various functions on the ESP, such as starting/stopping data collection, downloading onboard data, and calibrating the load cell.

All the code for this project can be found on [GitHub](https://github.com/sagarreddypatil/rocket-test-stand).
