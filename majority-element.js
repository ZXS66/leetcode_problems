/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
	var map = {};
	var half_len = nums.length / 2,
		majority;
	nums.some(n => {
		if (!map.hasOwnProperty(n)){
			map[n]=0;
		}
		var occurs = ++map[n];
		majority = n;
		return occurs > half_len;
	});
	return majority;
};
exports.majorityElement = majorityElement;