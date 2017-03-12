// https://discuss.leetcode.com/topic/67482/solution-with-detailed-explanation
/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function (buckets, minutesToDie, minutesToTest) {
	if (buckets === 1) {
		return 0;	// no pig is needed to test
	}
	if (minutesToTest < minutesToDie) {
		// can't figure out which bucket is posion if minutesToTest is less than minutesToDie
		return 0; // return new Error("invalid arguments");
	}
	var rounds = Math.floor(minutesToTest / minutesToDie);
	return logarithm(buckets, rounds + 1);
};
var logarithm = function (n, base) {
	// js has precision issue
	// return Math.log(n) / (base ? Math.log(base) : 1);
	var ret = 1,
		tmp = base;
	while (n > tmp) {
		tmp *= base;
		ret++;
	}
	return ret;
}
/**
 * how many pigs needed to test if it only allow 1 time to test
 */
var pigsInSingleRound = function (buckets) {
	var pigs = 1;
	while (Math.pow(2, pigs++) < buckets) { }
	return --pigs;
}
exports.poorPigs = poorPigs;