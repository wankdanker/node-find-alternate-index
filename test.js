var test = require('tape');
var find = require('./')
var findSync= require('./').findSync;
var resolve = require('path').resolve

test('basic sync test', function (t) {
	var result = findSync('./test/basic', ['index.jade', 'index.ejs', 'index.js', 'index.dust']);
	t.equal(result, resolve('./test/basic/index.ejs'));
	t.end();
});

test('basic async test', function (t) {
	find('./test/basic', ['index.jade', 'index.ejs', 'index.js', 'index.dust'], function (err, result) {
		t.equal(result, resolve('./test/basic/index.ejs'))
		t.end();
	})
});

test('hitting a dir as index sync test', function (t) {
	var result = findSync('./test/test2', ['index.jade', 'index.ejs', 'index.js', 'index.dust']);
	t.equal(result, resolve('./test/test2/index.dust'));
	t.end();
});

test('hitting a dir as index async test', function (t) {
	find('./test/test2', ['index.jade', 'index.ejs', 'index.js', 'index.dust'], function (err, result) {
		t.equal(result, resolve('./test/test2/index.dust'))
		t.end();
	})
});
