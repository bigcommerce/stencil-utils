# Stencil Utils
[![Build Status](https://travis-ci.org/bigcommerce/stencil-utils.svg?branch=master)](https://travis-ci.org/bigcommerce/stencil-utils) [![npm (scoped)](https://img.shields.io/npm/v/@bigcommerce/stencil-utils.svg)](https://www.npmjs.com/package/@bigcommerce/stencil-utils)

Stencil utils is a utility library that contains the Bigcommerce Stencil Events system and other tools that will help and enhance the
experience of building a theme with the Stencil framework.

### Documentation
https://stencil.bigcommerce.com/docs/the-stencil-utils-package

### Getting Started
Stencil Utils is written in ES6 and is currently transpiled to ES5 with babel for running client side within browsers.
Stencil utils can either be imported to your theme as a module, or included as a standalone script.

### Installing Stencil Utils on your theme

#### As an ES6 module
* Run `npm install @bigcommerce/stencil-utils` to install the latest tagged version of stencil-utils for use with your theme.
* Import the library `import utils from 'bigcommerce/stencil-utils';` in modules that depend on it.

#### Using standalone
If you do not want to support es6 modules, Stencil Utils can be included as a normal script:
* Copy the bundled script from `dist/stencil-utils.min.js` to your theme.
* Include the script in your HTML document
* Access stencil utils from `window.stencilUtils`.

Now you are playing with power!

#### License

Copyright (c) 2015-2016, Bigcommerce Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. All advertising materials mentioning features or use of this software
   must display the following acknowledgement:
   This product includes software developed by Bigcommerce Inc.
4. Neither the name of Bigcommerce Inc. nor the
   names of its contributors may be used to endorse or promote products
   derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY BIGCOMMERCE INC ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL BIGCOMMERCE INC BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

