# Rainbow Brackets for Visual Studio Code

Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets. This is particularly useful for Lisp or Clojure programmers, and of course, JavaScript, and other programmers.

The isolated right bracket will be highlighted in red.

![Functional Demo](http://www.2gua.info/static/uploads/20160509171502.gif)

# Install

Open up VS Code and hit `F1` and type `ext` select Install Extension and type `rainbow-brackets` hit enter and reload window to enable.

# Customize

Open Settings (JSON) to customize the colors of the brackets if you don't like the default ones.

```json
    "rainbow_brackets.roundBracketsColor": [ "#e6b422", "#c70067", "#00a960", "#fc7482" ],
    "rainbow_brackets.squareBracketsColor": [ "#33ccff", "#8080ff", "#0073a8" ],
    "rainbow_brackets.squigglyBracketsColor": [ "#d4d4aa", "#d1a075", "#9c6628" ],
    "rainbow_brackets.isolatedRightBracketsColor": "#e2041b",
```

# Updates

##0.0.7

- Provide the ability to define brackets colors in User Settings.

##0.0.6

- Add rainbow colors to the square brackets and the squiggly brackets.
- Same color same level of brackets.
