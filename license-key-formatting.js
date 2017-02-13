// https://leetcode.com/problems/license-key-formatting/

/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function (S, K) {
	if (!(typeof S == "string" && _REG_KEY.test(S))) {
		return '';// throw new Error("invalid argument S");
	}
	S = S.replace(/\-/g,'').toUpperCase();
	K = +K;
	if (K <= 0) {
		return '';// throw new Error("invalid argument K");
	}
	var ls = [];
	var i = S.length - K;
	while (i >= 0) {
		ls.push(S.slice(i, i + K));
		i -= K;
	}
	if (i > -K) {
		ls.push(S.slice(0, i + K));
	}
	return ls.reverse().join('-');
};
/** regular expression for validating input string of license key */
const _REG_KEY = /^[a-zA-Z0-9\-]{1,12000}$/;

exports.licenseKeyFormatting = licenseKeyFormatting;