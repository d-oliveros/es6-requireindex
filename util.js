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
    && mod !== null
    && mod.hasOwnProperty('default')
    && !!mod.default;

  if (hasES6Default) {
    ret = mod.default;
  }

  return ret;
}

/**
 * Gets the module name based on a file path.
 * @param  {String}  filepath  Path to a file.
 * @return {String}            Camelcase formatted module name.
 */
function getModuleName(filepath) {
  var parts = filepath.split('/');
  var filename = parts[parts.length - 1];

  if (filename.indexOf('.') > -1) {
    filename = filename.substr(0, filename.indexOf('.'));
  }

  var name = camelcase(filename);

  // Conserve the capitalization of the first char
  name = filename[0] + name.substring(1);

  return name;
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
