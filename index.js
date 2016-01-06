var fs = require('fs');
var path = require('path');
var util = require('./util');

/**
 * Requires the modules in the specified 'dir'.
 *
 * @param  {String}  dir (optional)
 *  The base directory to require entities from.
 *  If no 'dir' is provided, the directory of the caller will be used.
 *
 * @param  {Object}  opts (optional)
 *  Options object. Available options are:
 *
 *   - recursive (Default: true)
 *     If 'true', will require recursively through folders.
 *
 *   - requireES6Defaults (Default: true)
 *     if 'true', will require the 'default' property of the required module.
 *     if 'false', will require the whole exported object.
 *     This is helpful for es6 modules, where you can export a default object,
 *     because a es5-styled require will get the whole module, which has the
 *     default export in a property called 'default'.
 *
 * @return {Object} An object with all the modules require'd.
 */
module.exports = function requireDirectory(dir, opts) {
  if (!dir) dir = getCallerDirname();

  opts = util.withDefaults(opts);

  var mods = {};

  fs
    .readdirSync(dir)
    .forEach(function(filename) {
      var filePath = path.join(dir, filename);
      var Stats = fs.lstatSync(filePath);
      var isLink = Stats.isSymbolicLink();
      var isDir = Stats.isDirectory();
      var isFile = Stats.isFile();
      var isJS = filename.indexOf('.js') > -1;
      var isIndex = filename === 'index.js';

      if (isLink || isIndex) return;

      if (isDir && opts.recursive) {
        mods[filename] = requireDirectory(filePath, opts);
      }

      else if (isDir || (isFile && isJS)) {
        var modName = util.getModuleName(filename);

        // Require the file
        mods[modName] = require(filePath);

        // Check if the exported object has a es6-styled default export
        if (opts.requireES6Defaults) {
          mods[modName] = util.getExport(mods[modName]);
        }
      }
    });

  return mods;
};

/**
 * Gets the dirname of the caller function that is calling this method.
 * @return {String}  Absolute path to the caller's directory.
 */
function getCallerDirname() {
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack){ return stack; };
  var err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  var requester = stack[1].getFileName();

  return path.dirname(requester);
}
