# Magei
Magei is a powerful, intuitive, and consise image manipulation language.

## Doc

### Pixels
Magei is an image manipulation language, and of course, images are made out of pixels. Magei keeps track of all of the pixels of the input image and loops through the selected group of pixels automatically to apply code to them. All pixels are, fundamentally, just the values `red`, `green`, and `blue`. That's how the computer displays them anyway. But as humans, we're sometimes more interested in more abstract ideas like hue and brightness, or how each pixel relates to the other pixels nearby. Luckily, that's exactly what Magei is designed for.

### Math
You can do math just like most programming languages:

```
(129 - 14) * 3 / 5
--> 69
```

There are a few other math symbols, but all of the basic Magei operators are more or less the same as Haskell or Python's infix operators.

### Check
A check is a condition which will return true or false when run, which can be created before use. Here's an example:

```
check red: r > 50%
```

This check will return true if the `r`, aka redness value of a given pixel is over 50% of the maximum. This time we assigned the check by using the `check` keyword, but we could just as easily have just used `r > 50%` later instead. This leads us into the next point, conditions.

### For
A for statement is a condition that will run on every currently selected pixel in the image, and change whether they're selected or not. For example:

```
for red: g +50
```

Lets unpack what we just did. We used the `for` keyword to create a for statement, and passed it the check `red`, which we declared earlier in the Check section of this doc. Then we used the `:` symbol to say 'do this', and then applied an effect for every selected pixel.

### Effects
An effect is an operation which automatically acts on the selected pixel. There are a lot of different effects, but most importantly, you can create and apply your own! Before we get into that, lets check out the basic effects which are used to create all other effects:

 - `r` / Redness. The redness effect sets the red value of the pixel.
 - `g` / Greenness. Ditto but green.
 - `b` / Blueness.
 
 - `h` / Hue. Sets the hue of the pixel from 0-360.

