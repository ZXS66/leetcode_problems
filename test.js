var modu = require("./license-key-formatting");

var testcases = [
	{S:"2-4A0r7-4k",K:4},
	{S:"2-4A0r7-4k",K:3},
	{S:"2-4A0r7-4k@",K:3},
	{S:"2-4A0r7-4k",K:-3},
	{S:"",K:3},
	{S:"adfa-baa2-4A0r-4kad",K:3}
];

testcases.forEach(cs=>{
	try{
		var ret = modu.licenseKeyFormatting(cs.S, cs.K);
		console.log(ret);
	}catch(e){
		console.error(e);
	}
});