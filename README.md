# regular-loader

[![build status][build-status-image]][build-status-url]
[![npm package][npm-package-image]][npm-package-url]
[![license][license-image]][license-url]



## Installation

```bash
# for webpack 2
# WIP
# for webpack 1
npm install --save-dev extract-text-webpack-plugin@0.1.5
```

## Example

webpack.config.js

```js
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
    // ...
    entry: './index.js',
    module: {
      rules: [{
        test: /\.rgl$/,
        use: {
          loader: 'regular-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract( {
                use: 'css-loader',
                fallback: 'style-loader',
              } ),
              less: ExtractTextPlugin.extract( {
                use: [
                  'css-loader',
                  'less-loader'
                ],
                fallback: 'style-loader',
              } ),
            },
            preserveWhitespace: false,
          }
        },
      }]
    },
    plugins: [
      new ExtractTextPlugin( 'app.css' )
    ]
};
```

## Related

- [regularjs](https://github.com/regularjs/regular)

## Thanks

- [vue-loader](https://github.com/vuejs/vue-loader)

[build-status-image]: https://img.shields.io/circleci/project/regularjs/regular-loader/master.svg?style=for-the-badge
[build-status-url]: https://circleci.com/gh/regularjs/regular-loader

[npm-package-image]: https://img.shields.io/npm/v/regular-loader.svg?style=for-the-badge
[npm-package-url]: https://www.npmjs.org/package/regular-loader

[license-image]: https://img.shields.io/badge/license-MIT-000000.svg?style=for-the-badge
[license-url]: LICENSE
