var fs = require('fs')
	, dirname = require('path').dirname
	, extname = require('path').extname
	, join = require('path').join
	, doWhile = require('dank-do-while')
	, resolve = require('path').resolve
	;

module.exports = find;
module.exports.find = find;
module.exports.findSync = findSync;

function find(path, indexes, cb) {
	var i, resolved, index, dir, found;

	indexes = indexes || [];

	check(path, function (err, stat) {
		if (stat && !stat.isDirectory()) {
			return cb(null, path);
		}

		i = 0;

		resolved = resolve(path);

		doWhile(function (next) {
			index = indexes[i++];
		
			if (!index) {
				path = null;
				return next(false);
			}

			path = join(resolved, index);

			check(path, function (err, stat) {
				found = (stat && !stat.isDirectory())
					? true
					: false
					;

				return next(!found);
			});

		}, function () {
			//done;

			return cb(null, (!found) ? null : path);
		});
	});

	function check(path, cb) {
		fs.stat(path, function (err, stat) {
			return cb(null, stat);
		});
	}
}

function findSync(path, indexes) {
	//first check if path exists;
	var stat, i, resolved, index;
	
	indexes = indexes || [];
	resolved = resolve(path);
	stat = check(resolved);

	if (stat && !stat.isDirectory()) {
		return path;
	}

	//else keep looking
	for (i = 0; i < indexes.length; i++) {
		index = indexes[i];
		
		path = join(resolved, index);
		stat = check(path);

		if (stat && !stat.isDirectory()) {
			return path;
		}
	}

	return null;

	function check(path) {
		var stat;

		try {
			stat = fs.statSync(path);
		}
		catch (e) {}
		
		return stat;
	}
}
