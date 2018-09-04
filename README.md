# bulma-tile

[![Build Status](https://travis-ci.com/WebReflection/bulma-tile.svg?branch=master)](https://travis-ci.org/WebReflection/bulma-tile) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A self organized bulma-[tile](https://bulma.io/documentation/layout/tiles/) custom element.

Check out the [basic](https://webreflection.github.io/bulma-tile/test/) or [complex](https://webreflection.github.io/bulma-tile/test/complex.html) live demos.

### Usage

Simply write the `bulma-tile` tag whenever you need one.

Optionally define `vertical`, which will automatically set `is-vertical` modifier, or `size` from `1` to `12` to reflect it via `is-N` classes.

```html
<bulma-tile size=1 vertical>
```

All contextual modifiers such `is-anchestor`, `is-parent`, or `is-child` are added or removed automatically.

You could even drag around tiles through the inspector and see all nodes update accordingly.
