lunar-lander
============

A HTML5 Canvas version of the game(s)
[Lunar Lander](https://en.wikipedia.org/wiki/Lunar_Lander_(video_game_series)).

How to play
-----------

Open `index.html`. A fairly recent browser is required as the code uses some
ES2016+ features. If this advances enough for me to consider releasing it
anywhere besides GitHub I will set up a build process for older browsers.

The blue curve is your projected path with only gravity. Basically, it's the
path your ship would take if you cut the throttle right now. The red curve is
your projected path taking into account your throttle and rotation. If you don't
touch the controls, you will follow the red path.

I might remove the projections if I ever release this; they might make it too
easy. I added them just because I wanted to see what they looked like :P

### Controls:

Basically copied from Kerbal Space Program.

| key | action|
|---|------------|
| `A` | rotate left |
| `D` | rotate right|
| `Z` | full throttle |
| `X` | cut throttle |
| `shift` | throttle up |
| `ctrl` | throttle down |

Status
------

- [x] controllable ship
- [x] terrain
- [x] readouts
- [ ] accurate altitude readout
- [ ] fuel
- [ ] terrain collisions
- [ ] landing score
