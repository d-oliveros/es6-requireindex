var path = require('path');
var requireIndex = require('../index');
var expect = require('chai').expect;

var expectedStructure = [
  'index',
  'mockFile',
  'mockFile2',
  'mockFile3'
];

var expectedStructureRecursive = [
  'index',
  'mockFile',
  'mockFile2',
  'mockFile3',
  'folder'
];

describe('requireIndex', function() {

  it('should require using the caller\'s path', function() {
    var modules = require('./mockDirectory');
    checkIfRequiredCorrectly(modules, true);
  });

  it('should require recursively', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      recursive: true
    });

    checkIfRequiredCorrectly(modules, true);
    expect(modules.folder.thing).to.be.a('function');
  });

  it('should not require recursively', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      recursive: false
    });

    checkIfRequiredCorrectly(modules);
  });

  it('should require es6 defaults', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      requireES6Defaults: true
    });

    expect(modules.mockFile3).to.be.a('function');

  });

  it('should not require es6 defaults', function() {
    var modules = requireIndex(path.join(__dirname, 'mockDirectory'), {
      requireES6Defaults: false
    });

    expect(modules.mockFile3).to.be.an('object');
  });
});

function checkIfRequiredCorrectly(mods, recursive) {
  var expectedKeys = recursive ? expectedStructureRecursive : expectedStructure;
  expect(mods).to.be.an('object').with.keys(expectedKeys);
}
