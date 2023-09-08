---
title: "HawkVision"
summary: "One-stop-shop for all your machine vision needs"
coverImage: "/assets/frcvision.jpeg"
order: 6
---

HawkVision is a computer vision project I developed during my time at the FIRST Robotics Team 2554.

The goal of the project was to track a target marked with retroreflective tape. The camera that we used on the robot had a green ring light on it, so that the vision target appears bright green on the camera view.

To track the targets, we used a program called GRIP to build an OpenCV pipeline with color thresholds that narrowed out the vision target. We also calibrated the camera and found its focal length to determine the angle to the target.

With this information, we were able to run a PID loop on the robot so that it could automatically align with the target on command.

The code for this project can be found on [GitLab](https://gitlab.com/team-2554/hawkvision-2.0).
