# Stencil Utils
Stencil utils is a utility library that contains the Bigcommerce Stencil Events system and other tools that will help and enhance the
experience of building a theme with the Stencil framework.

### Documentation
https://stencil.bigcommerce.com/docs/the-stencil-utils-package

### Getting Started
Stencil Utils is written in ES6 and is currently transpiled to ES5 with babel for running client side within browsers.
Stencil utils can either be imported to your theme by JSPM as a module for use with the SystemJS loader, or included as a standalone script.

### Installing Stencil Utils on your theme

#### Using JSPM
If your theme takes advantage of the JSPM dependency manager you can simply:
* `cd` to the theme directory.
* Run `jspm install github:bigcommerce/stencil-utils` to install the latest tagged version of stencil-utils for use with your theme.
* Import the library `import utils from 'bigcommerce/stencil-utils';` in modules that depend on it.

#### Using standalone
If you do not want to use JSPM, Stencil Utils can be included as a normal script:
* Copy the bundled script from `dist/stencil-utils.min.js` to your theme.
* Include the script in your HTML document
* Access stencil utils from `window.stencilUtils`.

Now you are playing with power!
