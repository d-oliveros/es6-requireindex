var requireIndex = require('../browser');
var expect = require('chai').expect;

function mod1(){}
function mod2(){}
function nestedModule(){}
function nestedMethod(){}

var expectedStructure = [
  'mod1',
  'mod2',
  'nestedModule'
];

var mockModules = {
  './mod1.js': mod1,
  './mod2.js': mod2,
  './nestedModule/index.js': nestedModule,
  './nestedModule/method.js': nestedMethod
};

var mockCtx = function(filename) {
  return mockModules[filename];
};

mockCtx.keys = function() {
  return Object.keys(mockModules);
};

describe('Browser-side requireIndex', function() {

  it('should require from a webpack context correctly', function() {
    var res = requireIndex(mockCtx, { recursive: false });
    checkIfRequiredCorrectly(res, false);
  });

  it('should recursively require from a webpack context correctly', function() {
    var res = requireIndex(mockCtx);
    checkIfRequiredCorrectly(res, true);
  });
});

function checkIfRequiredCorrectly(mods, recursive) {
  expect(mods).to.be.an('object').with.keys(expectedStructure);

  if (recursive) {
    expect(mods.nestedModule).to.be.an('object')
      .with.property('method').which.is.a('function');
  } else {
    expect(mods.nestedModule).to.be.a('function');
    expect(mods.nestedModule).to.not.have.property('method');
  }
}
