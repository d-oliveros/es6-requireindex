# es6-requireindex
Helper to require() directories with es6 support.

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

### Options
- recursive (Default: true)

If 'true', will require recursively through folders.

- requireES6Defaults (Default: true)

if 'true', will require the 'default' property of the required module, and when 'false', will require the whole exported object. This is helpful for es6 moduples, where you can export a default object, because a es5-styled require will get the whole module, which has the default export in a property called 'default'.

Cheers.
