# [6.23.0](https://github.com/bigcommerce/stencil-utils/compare/6.22.0...6.23.0) (2026-04-08)


### Bug Fixes

* **release:** trigger CI for stencil-utils ([#244](https://github.com/bigcommerce/stencil-utils/issues/244)) ([cdb733f](https://github.com/bigcommerce/stencil-utils/commit/cdb733f0b95da3f2f4ecd1556331d823590efb6a))


### Features

* TRAC-366 audit and fix Stencil theme remote API calls for multi-language subfolder support ([#241](https://github.com/bigcommerce/stencil-utils/issues/241)) ([e5ec9b1](https://github.com/bigcommerce/stencil-utils/commit/e5ec9b11bd73452e7ca7e600eaa58975efaf1fc4))

# [6.22.0](https://github.com/bigcommerce/stencil-utils/compare/6.21.0...6.22.0) (2026-04-07)


### Bug Fixes

* **release:** trigger CI for stencil-utils ([#242](https://github.com/bigcommerce/stencil-utils/issues/242)) ([a18f5f2](https://github.com/bigcommerce/stencil-utils/commit/a18f5f274da29853c8b57b39266aebdfd681cc96))


### Features

* TRAC-362 add optional requestOptions to itemAdd and handleItemAdd for locale-aware cart requests ([#240](https://github.com/bigcommerce/stencil-utils/issues/240)) ([a3ea075](https://github.com/bigcommerce/stencil-utils/commit/a3ea075def3ebfeb4be3e45a17e42564158f3c1f))

# [6.21.0](https://github.com/bigcommerce/stencil-utils/compare/6.20.0...6.21.0) (2026-04-01)


### Bug Fixes

* add OIDC-compliant permissions to release workflow ([#231](https://github.com/bigcommerce/stencil-utils/issues/231)) ([30c9a31](https://github.com/bigcommerce/stencil-utils/commit/30c9a315a894d2b34b9922dce9f66a509125590b))
* **release:** trigger CI for stencil-utils ([959c1a5](https://github.com/bigcommerce/stencil-utils/commit/959c1a51590412fe6e935ad67a4348d2f81637b0))
* **release:** trigger CI for stencil-utils ([#229](https://github.com/bigcommerce/stencil-utils/issues/229)) ([df726dd](https://github.com/bigcommerce/stencil-utils/commit/df726dda6fdf4dd88403c1fc6b730bd774bc0184))
* STRF-13622 Fix PR release ([#226](https://github.com/bigcommerce/stencil-utils/issues/226)) ([30c7cbd](https://github.com/bigcommerce/stencil-utils/commit/30c7cbd828ae3515bfbe42becec74c55433231a4))


### Features

* STRF-13622 Semantic release ([#225](https://github.com/bigcommerce/stencil-utils/issues/225)) ([7612994](https://github.com/bigcommerce/stencil-utils/commit/7612994b7d743b302380fd9682c91108c140a252))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.20.0] - 2025-09-10

## What's Changed
* STRF-13076 - Cancel Quick Search Requests Early if New Search is Started by @bc-jz in [#221](https://github.com/bigcommerce/stencil-utils/pull/221)
## New Contributors
* @bc-jz made their first contribution in [#221](https://github.com/bigcommerce/stencil-utils/pull/221)

## [6.19.0] - 2024-12-17

## What's Changed
* STRF-12475: Add postFormData for cart.php to stencil-utils by @jordanarldt in [#218](https://github.com/bigcommerce/stencil-utils/pull/218)
* STRF-12475: Update version by @jordanarldt in [#219](https://github.com/bigcommerce/stencil-utils/pull/219)
## New Contributors
* @jordanarldt made their first contribution in [#218](https://github.com/bigcommerce/stencil-utils/pull/218)

## [6.18.0] - 2024-10-07

## What's Changed
* Reload page when we get a 401 back from bcapp by @jmwiese in [#216](https://github.com/bigcommerce/stencil-utils/pull/216)
* Update version by @jmwiese in [#217](https://github.com/bigcommerce/stencil-utils/pull/217)
## New Contributors
* @jmwiese made their first contribution in [#216](https://github.com/bigcommerce/stencil-utils/pull/216)

## [6.17.0] - 2024-09-24

## What's Changed
* feat: STRF-12444 Suport Node 20, drop node 14, 16 by @jairo-bc in [#212](https://github.com/bigcommerce/stencil-utils/pull/212)
* chore: release 6.17.0 by @jairo-bc in [#213](https://github.com/bigcommerce/stencil-utils/pull/213)

## [6.16.0] - 2024-09-24

## What's Changed
* feat: STRF-12284 Add dependabot by @bc-max in [#210](https://github.com/bigcommerce/stencil-utils/pull/210)
## New Contributors
* @bc-max made their first contribution in [#210](https://github.com/bigcommerce/stencil-utils/pull/210)

## [6.15.1] - 2023-06-07

- Add event_id field for BODL events
- Change product_id field type to string

## [6.15.0] - 2023-02-01

Rename cart_value to product_value for BODL Cart events

## [6.14.0] - 2023-01-30

- bump webpack and dependencies
- bump bodl events to 1.9.0

## [6.13.0] - 2022-12-20

-  feat: STRF-9847 BODL: Product Added and Removed ([190]([#190](https://github.com/bigcommerce/stencil-utils/pull/190)))
- INV-1394 - Add API for rendering modal windows using GQL query inside the template ([185]([#185](https://github.com/bigcommerce/stencil-utils/pull/185)))

## [6.12.1] - 2022-09-09

- fix STRF-10066: Fix add to cart button

## [6.12.0] - 2022-08-30

-   feat: STRF-9846 Integrate Bodl Events for Cart Add/Remove ([167]([#167](https://github.com/bigcommerce/stencil-utils/pull/167)))
-   feat: STRF-9982 Use BODL events from global scope ([171]([#171](https://github.com/bigcommerce/stencil-utils/pull/171)))

## [6.3.0] - 2020-11-04

# Do not use this release since it is broken and doesn't contain dist files

## [6.2.0] - 2020-11-04

No description provided.

## [6.1.0] - 2020-09-03

* Fix jQuery and EventEmitter namespace conflict

## [6.0.0] - 2020-08-28

* Drop jQuery

## [v5.0.2] - 2020-01-07

- Fix uncaught TypeError when only gift certificates

## [v5.0.1] - 2019-11-07

- Fixed cart quantity calculations with bundled products

## [v5.0.0] - 2019-11-05

No description provided.

## [4.2.0] - 2019-07-09

* Add new getSrcset function
* Add support for inherent width resizing
* Remove node 6 from travis, add node 12

## [4.1.0] - 2019-01-31

No description provided.

## [4.0.0] - 2018-12-10

* Accept options on getCartQuantity to allow baseURL

## [3.1.0] - 2018-12-03

Add utilities for working with local storage.

## [3.0.0] - 2018-12-03

Breaking Change
The interface for getCartQuantity did not follow JS standard of passing error as first param of callback. This has been fixed, but since the callback interface changed, we are bumping to 3.0.0.

## [2.0.0] - 2018-11-09

Breaking changes
* Remove cookie notification API -- this is unnecessary, as the information you need is already present in the context. See https://github.com/bigcommerce/cornerstone/pull/1380

## [1.1.3] - 2018-11-07

No description provided.

## [1.1.2] - 2018-02-21

No description provided.

## [1.1.1] - 2018-02-08

No description provided.

## [1.0.10] - 2017-11-15

No description provided.

## [1.0.4] - 2016-04-11

No description provided.

## [1.0.3] - 2016-04-05

No description provided.

## [1.0.2] - 2016-03-23

No description provided.

## [1.0.1] - 2016-03-23

No description provided.

## [1.0.0] - 2016-03-18

### Breaking changes
Removing JSPM as the self executing bundle generator and adding webpack to handle that bit.
`window` bound bundles continue to be used from `dist/stencil-utils.min.js` as a `<script>` tag in the markup of a page.
Any themes that were utilizing JSPM before will need to manually resolve the package `eventemitter2` by updating their `package.json` and `config.js` to point to have `"eventemitter2": "github:asyncly/EventEmitter2@^0.4.14",` and not `"asyncly/EventEmitter2": "github:asyncly/EventEmitter2@^0.4.14",`

## [0.4.0] - 2016-03-07

Added license files and bumped version

## [0.3.9] - 2016-03-03

- Added License files

## [0.3.8] - 2016-01-21

No description provided.

## [0.3.7] - 2016-01-05

- Set noConflict for JQuery so that it will return to the window
- Changes for EU Cookie message

## [0.3.6] - 2015-12-22

This Release includes the updated code for the EU Cookie warning.

## [0.3.5] - 2015-10-28

No description provided.

## [0.3.4] - 2015-09-04

No description provided.

## [0.3.3] - 2015-09-04

No description provided.

## [0.3.2] - 2015-08-04

No description provided.

## [0.3.1] - 2015-07-30

No description provided.

## [0.3.0] - 2015-07-29

No description provided.

## [0.2.0] - 2015-07-17

Includes new `Tools` section with `Image` being the first Tool.

## [0.1.7] - 2015-07-07

No description provided.

## [0.1.6] - 2015-06-18

No description provided.

## [0.1.5] - 2015-06-16

No description provided.

## [0.1.3] - 2015-06-12

Themes can utilize the simple form validation models as
``` javascript
let fieldValue = $('input[name="username"]'); //example value is "myname"
var validated = utils.forms.login.username(fieldValue)
console.log(validated) //false, Bigcommerce requires email based usernames, utils.forms.login.username performs these checks for you.
```
Available form models will be documented and include forms such as Login, Create Account, Add Address, etc.

## [0.0.8] - 2015-05-18

- New hooks system, the following hooks will be fired:
- Cart
- `cart-item-add-remote` - When an item is added to the cart
- `cart-item-update-remote` - When an item is updated (quantity)
- `cart-item-remove-remote` - When an item is removed from the cart
- Search
- `search-quick-remote` - When a search is performed in the quick-search input
- Product
- `product-options-change-remote` - When a product remote has been changed
- Can access the remote utils directly instead going through the namespace:
- `utils.remote.cart.itemAdd` -> `utils.cart.itemAdd`

## [0.0.7] - 2015-05-12

New function:
- `itemAdd` - Allows you to add items to the cart
Refactor options logic for flexibility.

## [0.0.6] - 2015-05-04

Quick search events now fire when the input changes on a quick search box.
There is a new renderable search endpoint `stencilUtils.remote.search.search(searchQuery, params, callback)`

## [0.0.5] - 2015-05-01

New product events for:
- Product sharing
- Add to wishlist
- Quantity selector changed
