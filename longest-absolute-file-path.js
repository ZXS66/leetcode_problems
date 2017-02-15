// https://leetcode.com/problems/longest-absolute-file-path/

/**
 * @param {string} input
 * @return {number}
 */
var lengthLongestPath = function (input) {
	var reg_file = /[^\n\t]*\.[^\n\t]+/gi;
	var paths = input.split('\n');
	var temp_paths = [];
	var longestLength = 0;
	var i, p, d, l;

	function depth(path) {
		return path.length - path.trim().length;
	}
	for (i = 0; i < paths.length; i++) {
		p = paths[i];
		d = depth(p);
		if (p.indexOf('.') !== -1) {
			// file
			l = temp_paths.slice(0, d).map(s => s.length).reduce((a, b) => {
				return a + b;
			}, p.length);
			if (l > longestLength)
				longestLength = l;
		} else {
			// directory
			temp_paths[d] = p.trim();
		}
	}
	return longestLength;
};
exports.lengthLongestPath = lengthLongestPath;