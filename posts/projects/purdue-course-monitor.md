---
title: "Purdue Course Monitor"
summary: "Because Coursicle costs money and I decided this was easier"
coverImage: "/assets/pcm.png"
order: 5.5
---

_The Programmers’ Credo: we do these things not because they are easy, but
because we thought they were going to be easy_

I didn't want to pay for Coursicle so I decided to webscrape the Purdue course
catalog at regular intervals to find out if seats opened in any classes. It
worked satisfactorily.

I was able to complete this in a week, which is only 7 times more than the
intended amount, which might be a personal record.

I scraped the course/section lists for entire departments using Selenium/BeautifulSoup in Python and then cached them. This is because the request took a good couple seconds.

The next step was monitoring a list of courses, which I did by using the builtin requests library, and a User-Agent string from my web browser. These pages were available on the public web, so no funny business was required here.

Except requests were IP ratelimited, because of course they were, so I had to space out the requests, even across multiple sections. That is, even if I only checked diffs every hour or so, requesting information on multiple sections at once triggered the ratelimit, and I had to wait for a certain time for it to resume responding to requests.

It did work at the end though, which was awesome. I also used Pushover to send notifications when a course opened up to my phone, which was very convenient. A few of my friends got some use out of this too, so I consider it a success.

Code on [GitHub](https://github.com/sagarreddypatil/purdue-course-monitor)
