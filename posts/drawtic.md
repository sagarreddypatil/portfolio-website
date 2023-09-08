---
title: "Drawtic Phone"
summary: "Draw anywhere you want, zero consequences"
coverImage: "/assets/drawtic.jpg"
order: 4.5
---

This was a Hackathon project for BoilerMake X.

The premise is simple, just drawing anywhere with your hands and a laptop with a camera.

Aref and I was responsible for the drawing part of the whole thing, basing
off of the work of a [previous Python prototype by Aref](https://github.com/arefmalek/airdraw).

This version had to be in the browser, and we decided to make a game out of it, similar to [Gartic Phone](https://garticphone.com/).

We used an open source model by Google to track the player's hand, which ran
entirely in-browser. All we had to do after that is match hand positions to
different tools. For example, if only the index finger and thumb were up, you had the drawing tool, and you could control the size of your brush based on the dot product of the pointing vectors of each finger.

Then to draw, we simply stored a list of strokes, where each stroke was a list of positions. Showing the drawing was as simple as drawing lines according to the strokes.

The code for this project can be found on [GitHub](https://github.com/arefmalek/DrawticPhone)
