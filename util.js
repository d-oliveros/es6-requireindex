var camelcase = require('camelcase');

exports.getExport = getExport;
exports.getModuleName = getModuleName;
exports.withDefaults = withDefaults;

/**
 * Returns the default export object.
 * @return {Mixed}  The default export of the passed-in module.
 */
function getExport(mod) {
  var ret = mod;

  var hasES6Default = typeof mod === 'object'
    && mod.hasOwnProperty('default')
    && typeof mod.default === 'function';

  if (hasES6Default) {
    ret = mod.default;
  }

  return ret;
}

function getModuleName(filepath) {
  var parts = filepath.split('/');
  var filename = parts[parts.length - 1];

  return camelcase(filename.substr(0, filename.indexOf('.')));
}

/**
 * Builds the options object and set the defaults.
 *
 * @param  {Object}  opts  Options object.
 * @return {Object}        Options object with defaults.
 */
function withDefaults(opts) {
  opts = opts || {};

  return {
    recursive: typeof opts.recursive === 'boolean'
      ? opts.recursive
      : true,

    requireES6Defaults: typeof opts.requireES6Defaults === 'boolean'
      ? opts.requireES6Defaults
      : true
  };
}
