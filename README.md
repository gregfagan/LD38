# technoglyph

A 3D text adventure game built for Ludum Dare Jam 38. We didn't quite manage the time to build the content, so this exists mostly as a demo for what we manged to build and not so much a full game.

_Note: This game is unfinished and cannot be completed. Have a look around and enjoy the cool soundtrack (make sure you check your inventory!) but don't get too hung up on achieving much..._

Requires a WebGL enabled browser.

## Story

You live on a node in a computer world that is under threat from a memory corrupting virus. As the virus corrupts each sector, vital links to your node are being lost. You must race against time to establish an uplink that will save your node from the ultimate threat — garbage collection.

## Controls

Basic text adventure commands:

* **look** _target(optional)_: examine your surroundings
* **go** _destination_: travel to an adjacent sector
* **inventory**: see what you're carrying
* **use** _item_ _target(optional)_: manipulate the world
* **take** _item_: you might need to bring some things with you
* **examine** _item_: look at things in your inventory

## Making of

When the theme of "A Small World" was pitched, we settled fairly quickly on the concept of a text adventure that takes place on the surface of a 3D world.

We settled on a dodecahedron and got to work using threejs (with a bit of ultimately needless React wrapping) and modern JavaScript to build the world and render it.

With more time we would flesh out the content of the world, adding puzzles and flavorful descriptions to the various sectors along with more visual polish.
