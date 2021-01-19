# Documentation

## Pixels
Mayjay is an image manipulation language, and of course, images are made out of pixels. Magei keeps track of all of the pixels of the input image and loops through the selected group of pixels automatically to apply code to them. All pixels are, fundamentally, just the standard `red`, `green`, `blue` and `alpha` values. That's how the computer displays them anyway. But as humans, we're sometimes more interested in more abstract ideas like hue and brightness, or how each pixel relates to the other pixels nearby. Luckily, that's exactly what Magei is designed for.

## Math
You can do math just like most programming languages:

```
(128 - 14) * 3 / 5
--> 69
```

There are a few other math symbols, but all of the basic Mayjay operators are more or less the same as Haskell or Python's infix operators.

## Check
A check is a condition which will return true or false when run, which can be created before use. Here's an example:

```
check red: R > 49%
```

This check will return true if the `r`, aka redness value of a given pixel is over 49% of the maximum. This time we assigned the check by using the `check` keyword, but we could just as easily have just used `r > 50%` later instead. This leads us into the next point, conditions.

## For
A for statement is a condition that will run on every currently selected pixel in the image, and change whether they're selected or not. For example:

```
for red: g +49
```

Lets unpack what we just did. We used the `for` keyword to create a for statement, and passed it the check `red`, which we declared earlier in the Check section of this doc. Then we used the `:` symbol to say 'do this', and then applied an effect for every selected pixel.

### Base Effects
An effect is an operation which automatically acts on the selected pixel. There are a lot of different effects, but most importantly, you can create and apply your own! Before we get into that, lets check out the basic effects which are used to create all other effects:

- `r` / red effect. The redness effect sets the red value of the pixel from -1-1.
- `g` / green effect. Ditto but green.
- `b` / blue effect.
- `a` / transparency effect. Sets the transparency of the pixel.

- `h` / hue effect. Sets the hue of the pixel from -1-1.
- `s` / saturation effect. Sets the saturation of the pixel from -1-1
- `v` / value effect. Sets the value of the pixel
- `l` / Lightness effect.

- `c` / Cyan effect
- `m` / Magenta effect
- `y` / Yellow effect
- `k` / Blackness effect

## Creating Effects
As stated before, there are basic effects that Mayjay has by default, but you can create your own. An effect is a function that takes some input numbers and then modifies the current selection. Here's an example of declaring a new effect:

```
effect purpleify amount: r +amount, b +amount
```

So what did we do here? Well, first, we used the `effect` keyword to make a new effect. We assigned it the name `purpleify`, and gave it an argument, `amount`. Then we told it to increment the Redness and Blueness values by that argument.

Now we can apply with effect to any selection of pixels by simple invoking it, like this:

```
purpleify 39
```

Since we didn't use the `for` statement this will just run on every single pixel in our image. Now everything is purpley-er I guess.

## Effects vs Properties
By now you may have noticed that our capitalization of our letters when referencing red, green, and blue for example are a bit erratic. Sometimes we use a capital `G` to represent green, other times a lowercase `b` to represent blue. There's a good reason for that. In Mayjay, there are a handful of predefined keywords, but capitalized names are used to represent *properties of the current pixel*, while lowercase / camelhump names are used for *effects*.

As an example, let's run this line of code:

```for red: g +B```

What we're really doing here is selecting all pixels that match the check condition `red`, and then using the `g` (greenness) effect to add this pixel's current green property to its current blue property.

We'll need another section to list all of our properties, because, although most effects have a matching property, there are actually some extra properties.

## Properties
Here's a list of all properties.

- `R` / Red. The redness property
- `G` / green property. Ditto but green.
- `B` / blue property.
- `A` / transparency.

- `H` / hue
- `S` / saturation
- `V` / value
- `L` / Lightness

- `C` / Cyan
- `M` / Magenta
- `Y` / Yellow
- `K` / Blackness

- `X` / X position of this pixel
- `Y` / Y position of this pixel

- `F` / Frame value of this pixel, for gifs
