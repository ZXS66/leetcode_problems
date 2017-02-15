// https://leetcode.com/problems/longest-absolute-file-path/
// https://discuss.leetcode.com/topic/55345/this-problem-is-not-well-defined-it-should-state-that-4-space-is-considered-as-a-tab-under-certain-situation
/**
 * @param {string} input
 * @return {number}
 */
var lengthLongestPath = function (input) {
	var paths = input.split('\n');
	var temp_paths = [];
	var longestLength = 0;
	var i, p, d, l;
	
	function depth(path) {
		var reg = /[^\t]/g;
		return reg.exec(path).index;
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
			temp_paths[d] = p.replace(/\t/g,'');
		}
	}
	return longestLength;
};
exports.lengthLongestPath = lengthLongestPath;