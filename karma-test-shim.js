'use strict';

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

var map = {
  'app': 'base/app',
  'rxjs': 'base/node_modules/rxjs',
  '@angular': 'base/node_modules/@angular'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
  'app': { main: 'main.js',  defaultExtension: 'js' },
  'rxjs': { defaultExtension: 'js' }
};

var packageNames = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/router-deprecated',
  '@angular/testing',
  '@angular/upgrade',
];

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function(pkgName) {
  packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

packages['base/app'] = {
  defaultExtension: 'js',
  format: 'cjs',
  map: Object.keys(window.__karma__.files).filter(onlyAppFiles).reduce(createPathRecords, {})
};

var config = {
  //"defaultJSExtensions": true,
  map: map,
  packages: packages
};

System.config(config);

System.import('@angular/platform-browser/src/browser/browser_adapter')
    .then(function(browser_adapter) { browser_adapter.BrowserDomAdapter.makeCurrent(); })
    .then(function() {
      return Promise.all([
        System.import('@angular/core/testing'),
        System.import('@angular/platform-browser-dynamic/testing/browser')
      ]);
    })
    .then(function(modules) {
      var testing = modules[0];
      var testingBrowser = modules[1];
      testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
        testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
    })
    .then(function() { return Promise.all(resolveTestFiles()); })
    .then(function() { __karma__.start(); }, function(error) { __karma__.error(error.stack || error); });

function createPathRecords(pathsMapping, appPath) {
    // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
    // './vg-player/vg-player':
    // '/base/dist/vg-player/vg-player.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
    //console.log('appPath = '+appPath);
    var pathParts = appPath.split('/');
    var moduleName = './' + pathParts.slice(Math.max(pathParts.length - 2, 1)).join('/');
    moduleName = moduleName.replace(/\.js$/, '');
    pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath];
    return pathsMapping;
}

function onlyAppFiles(filePath) {
    return /\/base\/app\/(?!.*\.spec\.js$).*\.js$/.test(filePath);
}

function onlySpecFiles(path) {
    return /\.spec\.js$/.test(path);
}

function resolveTestFiles() {
    return Object.keys(window.__karma__.files)  // All files served by Karma.
        .filter(onlySpecFiles)
        .map(function(moduleName) {
            // loads all spec files via their global module names (e.g.
            // 'base/dist/vg-player/vg-player.spec')
            return System.import(moduleName);
        });
}
