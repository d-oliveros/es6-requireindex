var path = require('path');
var requireIndex = require('../index');
var expect = require('chai').expect;

var expectedStructure = [
  'mockFile',
  'MockFile2',
  'mockFile3',
  'folder'
];

describe('Server-side requireIndex', function() {

  it('should require using the caller\'s path', function() {
    var modules = require('./mockDirectory');
    checkIfRequiredCorrectly(modules, true);
  });

  it('should require recursively', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      recursive: true
    });

    checkIfRequiredCorrectly(modules, true);
  });

  it('should not require recursively', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      recursive: false
    });

    checkIfRequiredCorrectly(modules);

    expect(modules.folder.thing).to.not.be.a('function');
  });

  it('should require es6 defaults', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      requireES6Defaults: true
    });

    expect(modules.mockFile3).to.be.an('object')
      .with.property('oneThing').which.is.a('function');
  });

  it('should not require es6 defaults', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      requireES6Defaults: false
    });

    expect(modules.mockFile3).to.be.an('object');
  });
});

function checkIfRequiredCorrectly(mods, recursive) {
  expect(mods).to.be.an('object').with.keys(expectedStructure);

  if (recursive) {
    expect(mods.folder).to.be.an('object')
      .with.property('thing').which.is.a('function');
  } else {
    expect(mods.folder).to.be.an('object');
    expect(mods.folder).to.not.have.property('thing');
  }
}
