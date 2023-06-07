# JSON Resume Theme Gitlab

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![code style: stylelint](https://img.shields.io/badge/stylelint-000?label=code%20style&color=%23263238)](https://github.com/stylelint/stylelint)

[![techno: handlebars](https://img.shields.io/badge/handlebars-000?logo=Handlebars.js&logoColor=white)](https://github.com/handlebars-lang/handlebars.js)
[![techno: bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white)](https://github.com/twbs/bootstrap)
[![techno: font-awesome](https://shields.io/badge/font-awesome-000?logo=Font%20Awesome&logoColor=white&labelColor=528DD7&color=528DD7)](https://github.com/FortAwesome/Font-Awesome)

A JSON Resume theme looking like a Gitlab profile.

## Preview

The theme can be previewed at [https://kells64000.github.io/jsonresume-theme-gitlab](https://kells64000.github.io/jsonresume-theme-gitlab).

## Getting Started

Checkout [https://jsonresume.org/getting-started/](https://jsonresume.org/getting-started/).

### Additional schema

You can add `"logo": "url"` to `work`, `education` or `certificates`.

You can add `"lang": "countryCode"` to `meta`.

> ℹ️ If property meta.lang is not defined, the default value is `en`.  
> ⚠️ Only `en` && `fr` are supported. PR welcome for other translations.

You can add `"countryCode": "countryCode"` to `languages`.

> ℹ️ The countryCode need to be a valid [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search).

You can add `"icon": "fontAwesomeIcon"` to `skills` or `interests`.

> ⚠️ Only free and solid or brands.

## Local development

### Required

- docker 🐋
- docker-compose 🐳

### Install

```docker-compose run --rm node npm i```

```docker-compose run --rm --service-ports node npm start```

[http://localhost:4000/](http://localhost:4000/)
