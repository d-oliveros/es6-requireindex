# es6-requireindex
Requires the modules in a directory, with support for es6-style exports (aka `export default`), and the browser via webpack.

If a module exports a default object, requireIndex will expose the default object as the module's export (instead of exposing an object with the `default` property referencing the es6 default export).


### Usage

```js
// Short form. eg. in index.js
module.exports = require('es6-requireindex')();
```

```js
// With options
var requireIndex = require('es6-requireindex');
var targetDir = path.join(__dirname, 'somedir');

module.exports = requireIndex(somedir, {
  recursive: true|false, // Default: true
  requireES6Defaults: true|false // Default: true
});
```

If you want to use it with webpack to require a folder, you must do:

```js
var ctx = require.context(__dirname, true, /^(.*\.((js|jsx)$))[^.]*$/igm);
module.exports = requireIndex(ctx, [opts]);
```

To require all the files in a folder in an isomorphic fashion (eg with browser and server support), you can do:

```js
var ctx;

try {
  ctx = require.context(__dirname, true, /^(.*\.((js|jsx)$))[^.]*$/igm);
} catch (err) {}

module.exports = requireIndex(ctx);
```


### Options
- recursive (Default: true)

If 'true', will require recursively through folders.

- requireES6Defaults (Default: true)

if 'true', will require the 'default' property of the required module, and when 'false', will require the whole exported object. This is helpful for es6 modules, where you can export a default object, because a es5-styled require will get the whole module, which has the default export in a property called 'default'.


### Tests

```
npm test
```

Cheers.
