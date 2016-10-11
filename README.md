# SASS Open color

SASS-only Bower version of https://github.com/yeun/open-color

## Installation

```
$ bower install -D open-color
```

## Variable convention

### SASS, SCSS

```sass
$oc-(color)-(number)
```

---

- `oc`:  Abbreviation for Open color
- `(color)`: Color name such as gray, red, lime, etc.
- `(number)`: 0 to 9. Brightness spectrum.


## How to use

Import the file to your project and use the variables.

**Example**

```sass
@import 'bower-components/open-color';

.body {
  background-color: $oc-gray-0;
  color: $oc-gray-7;
}

a {
  color: $oc-teal-7;

  &:hover,
  &:focus,
  &:active {
    color: $oc-indigo-7;
  }
}
```
