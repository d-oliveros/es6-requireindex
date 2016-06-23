var util = require('./util');

module.exports = function requireFromWebpackContext(ctx, opts) {
  opts = util.withDefaults(opts);

  var mods = {};

  ctx.keys().forEach(function(filename) {
    var mod = ctx(filename);

    // Check if the exported object has a es6-styled default export
    if (opts.requireES6Defaults) {
      mod = util.getExport(mod);
    }

    var filepath = filename.replace('./', '');

    if (filepath === 'index.js') {
      return;
    }

    setIn(mod, mods, filepath, opts.recursive);
  });

  return mods;
};

function setIn(mod, mods, filename, recursive) {
  var parts = filename.split('/');
  var isDirPart = parts.length > 1;
  var modName = util.getModuleName(parts[0]);

  // if filename is nested and the recursive flag is on
  if (isDirPart && recursive) {
    mods[modName] = mods[modName] || {};
    setIn(mod, mods[modName], parts.slice(1).join('/'));
  } else if (!isDirPart || parts[1] === 'index.js') {
    // filename is in root level, no directory or recursion needed
    // or filename is in directory, but is index file
    modName = util.getModuleName(parts[0]);
    mods[modName] = mod;
  }
}
