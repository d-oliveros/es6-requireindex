var camelcase = require('camelcase');

module.exports = function requireFromWebpackContext(req) {
  var mods = {};

  req.keys().forEach(function(filename) {
    var mod = req(filename);

    if (typeof mod === 'object' && typeof mod.default === 'function') {
      mod = mod.default;
    }

    var modName = filename.split('/');
    modName = modName[modName.length - 1];
    modName = camelcase(modName.substr(0, modName.indexOf('.')));

    mods[modName] = mod;
  });

  return mods;
};
