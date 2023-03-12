---
title: Post One
date: "2021-12-14"
---

# Marching Cubes

<img src="https://media.githubusercontent.com/media/sagarreddypatil/portfolio-website/master/static/img/marching-cubes.JPG">

The marching cubes algorithm is used to generate a 3D surface out of a scalar field. As a side project, I wanted to implement the Marching Cubes algorithm efficiently in the Unity3D game engine to generate interactive, procedural terrain.

The first method I tried was to write the algorithm in a compute shader. However, this proved to be too slow due to time it took to move the vertices from the GPU back to the CPU.

After that, I tried to implement the algorithm in Unity's Job system, which allowed for automatically parallelized tasks. This offered a significant speed benefit.

In order to make the terrain editable, I also added a chunking system, so that the terrain could be split into chunks and only one chunk had to be regenerated when the underlying voxel data changed.

The code for this project can be found on GitHub. 