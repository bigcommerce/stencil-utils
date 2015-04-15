# Stencil Utils
Stencil utils is a JSPM module that contains the Bigcommerce Stencil Events system and other tools that will help and enhance the
experience of building a theme with the Stencil framework.

### Getting Started
To get started with JSPM and this module be sure to install `npm install -g jspm` and this will install JSPM on your 
system. Check out the JSPM [documentation](https://github.com/jspm/jspm-cli) for more information

### JSPM Private Repos
Create an access token [here](https://github.com/settings/applications) that will be used by JSPM to access the private Github repos.
Once you have your token run `jspm registry config github` and input your credentials. This will create a Github jspm configuration.
Once this is complete you are ready for the next step.

### Install stencil-utils
Stencil-utils is meant to be utilized by the theme for javascript and will need to have the modules installed in the theme.
* `git clone git@github.com:bigcommerce-labs/stencil.git` the stencil theme.
* `cd` to the stencil theme directory.
* Run `jspm install github:bigcommerce/stencil-utils` to install stencil-utils for use with jspm.

Now you are playing with power!
