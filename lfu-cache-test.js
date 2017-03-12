var M = require("./lfu-cache.js");

/************************************/
// Input:
// ["LFUCache","put","get"]
// Expected:
// [[0],[0,0],[0]]

// var cache = new M.LFUCache( 2 /* capacity */ );
// var ret;
// cache.put(1, 1);
// cache.put(2, 2);
// ret = cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// ret = cache.get(2);       // returns -1 (not found)
// ret = cache.get(3);       // returns 3.
// cache.put(4, 4);    // evicts key 1.
// ret = cache.get(1);       // returns -1 (not found)
// ret = cache.get(3);       // returns 3
// ret = cache.get(4);       // returns 4

/************************************/
// Input:
// ["LFUCache","put", "get"]
// [[0],[0,0],[0]]
// Expected:
// [null,null,-1]

// var cache = new M.LFUCache( 0 );
// var ret;
// cache.put(0, 0);
// ret = cache.get(0);
// console.log(ret);

/****************************** WRONG OUTPUT FOR MY CODE !!! ******/
// Input:
// ["LFUCache","put","put","get","get","put","get","get","get"]
// [[2],[2,1],[3,2],[3],[2],[4,3],[2],[3],[4]]
// Output:
// [null,null,null,2,1,null,-1,2,3]
// Expected:
// [null,null,null,2,1,null,1,-1,3]

// var cache = new M.LFUCache( 2 );
// console.log(cache.put(2, 1));
// console.log(cache.put(3, 2));
// console.log(cache.get(3));
// console.log(cache.get(2));
// console.log(cache.put(4, 3));
// console.log(cache.get(2));
// console.log(cache.get(3));
// console.log(cache.get(4));
// console.log("What wrong?");

/************************************/
// ["LFUCache","set","set","get","get","get","set","set","get","get","get","get"]
// [[3],[2,2],[1,1],[2],[1],[2],[3,3],[4,4],[3],[2],[1],[4]]
// Expected:
// [null,null,null,2,1,2,null,null,-1,2,1,4]

// var cache = new M.LFUCache( 3 );
// var ret;
// cache.put(2, 2);
// cache.put(1, 1);
// ret = cache.get(2);
// ret = cache.get(1);
// ret = cache.get(2);
// cache.put(3, 3);
// cache.put(4, 4);
// ret = cache.get(3);
// ret = cache.get(2);
// ret = cache.get(1);
// ret = cache.get(4);
// console.log(ret);


/****************************** UNMATCHED LENGTH OF TEST CASE EXPECTED RESULT,  ******/
// Input:
// ["LFUCache","set","set","get","set","get","get","set","get","get","get"]
// [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]
// Expected:
// [null,null,null,1,null,1,3,-1,null,-1,-1,4]
// var cache = new M.LFUCache( 2 );

// var ret;
// cache.put(1, 1);
// cache.put(2, 2);
// ret = cache.get(1);
// cache.put(3, 3);
// ret = cache.get(2);
// ret = cache.get(3);
// cache.put(4, 4);
// ret = cache.get(1);
// ret = cache.get(3);
// ret = cache.get(4);
// console.log(ret);

/************************************/
// Input:
// ["LFUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"]
// [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]
// Output:
// [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,14,null,null,18,null,null,11,null,null,null,null,null,18,null,null,24,null,4,29,30,null,12,11,null,null,null,null,29,null,null,null,null,17,-1,18,null,null,null,24,null,null,null,20,null,null,null,-1,18,18,null,null,null,null,20,null,null,null,null,null,null,null]
// Expected:
// [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,14,null,null,18,null,null,11,null,null,null,null,null,18,null,null,-1,null,4,29,30,null,12,11,null,null,null,null,29,null,null,null,null,17,-1,18,null,null,null,-1,null,null,null,20,null,null,null,29,18,18,null,null,null,null,20,null,null,null,null,null,null,null]

var cache = new M.LFUCache( 10 );
var ret;
cache.put(10,13);	// 
cache.put(3,17);	// 
cache.put(6,11);	// 
cache.put(10,5);	// 
cache.put(9,10);	// 
console.log(ret=cache.get(13));	// output as expected: -1
cache.put(2,19);	// 
console.log(ret=cache.get(2));	// output as expected: 19
console.log(ret=cache.get(3));	// output as expected: 17
cache.put(5,25);	// 
console.log(ret=cache.get(8));	// output as expected: -1
cache.put(9,22);	// 
cache.put(5,5);	// 
cache.put(1,30);	// 
console.log(ret=cache.get(11));	// output as expected: -1
cache.put(9,12);	// 
console.log(ret=cache.get(7));	// output as expected: -1
console.log(ret=cache.get(5));	// output as expected: 5
console.log(ret=cache.get(8));	// output as expected: -1
console.log(ret=cache.get(9));	// output as expected: 12
cache.put(4,30);	// 
cache.put(9,3);	// 
console.log(ret=cache.get(9));	// output as expected: 3
console.log(ret=cache.get(10));	// output as expected: 5
console.log(ret=cache.get(10));	// output as expected: 5
cache.put(6,14);	// 
cache.put(3,1);	// 
console.log(ret=cache.get(3));	// output as expected: 1
cache.put(10,11);	// 
console.log(ret=cache.get(8));	// output as expected: -1
cache.put(2,14);	// 
console.log(ret=cache.get(1));	// output as expected: 30
console.log(ret=cache.get(5));	// output as expected: 5
console.log(ret=cache.get(4));	// output as expected: 30
cache.put(11,4);	// 
cache.put(12,24);	// 
cache.put(5,18);	// 
console.log(ret=cache.get(13));	// output as expected: -1
cache.put(7,23);	// 
console.log(ret=cache.get(8));	// output as expected: -1
console.log(ret=cache.get(12));	// output as expected: 24
cache.put(3,27);	// 
cache.put(2,12);	// 
console.log(ret=cache.get(5));	// output as expected: 18
cache.put(2,9);	// 
cache.put(13,4);	// 
cache.put(8,18);	// 
cache.put(1,7);	// 
console.log(ret=cache.get(6));	// output as expected: 14	??????
cache.put(9,29);	// 
cache.put(8,21);	// 
console.log(ret=cache.get(5));	// output as expected: 18
cache.put(6,30);	// 
cache.put(1,12);	// 
console.log(ret=cache.get(10));	// output as expected: 11
cache.put(4,15);	// 
cache.put(7,22);	// 
cache.put(11,26);	// 
cache.put(8,17);	// 
cache.put(9,29);	// 
console.log(ret=cache.get(5));	// output as expected: 18
cache.put(3,4);	// 
cache.put(11,30);	// 
console.log(ret=cache.get(12));	// ERROR: output is 24, but expected is -1 ??????
cache.put(4,29);	// 
console.log(ret=cache.get(3));	// output as expected: 4
console.log(ret=cache.get(9));	// output as expected: 29
console.log(ret=cache.get(6));	// output as expected: 30
cache.put(3,4);	// 
console.log(ret=cache.get(1));	// output as expected: 12
console.log(ret=cache.get(10));	// output as expected: 11
cache.put(3,29);	// 
cache.put(10,28);	// 
cache.put(1,20);	// 
cache.put(11,13);	// 
console.log(ret=cache.get(3));	// output as expected: 29
cache.put(3,12);	// 
cache.put(3,8);	// 
cache.put(10,9);	// 
cache.put(3,26);	// 
console.log(ret=cache.get(8));	// output as expected: 17
console.log(ret=cache.get(7));	// output as expected: -1
console.log(ret=cache.get(5));	// output as expected: 18
cache.put(13,17);	// 
cache.put(2,27);	// 
cache.put(11,15);	// 
console.log(ret=cache.get(12));	// ERROR: output is 24, but expected is -1 ??????
cache.put(9,19);	// 
cache.put(2,15);	// 
cache.put(3,16);	// 
console.log(ret=cache.get(1));	// output as expected: 20
cache.put(12,17);	// 
cache.put(9,1);	// 
cache.put(6,19);	// 
console.log(ret=cache.get(4));	// ERROR: output is -1, but expected is 29 ??????
console.log(ret=cache.get(5));	// output as expected: 18
console.log(ret=cache.get(5));	// output as expected: 18
cache.put(8,1);	// 
cache.put(11,7);	// 
cache.put(5,2);	// 
cache.put(9,28);	// 
console.log(ret=cache.get(1));	// output as expected: 20
cache.put(2,2);	// 
cache.put(7,4);	// 
cache.put(4,22);	// 
cache.put(7,24);	// 
cache.put(9,26);	// 
cache.put(13,28);	// 
cache.put(11,26);	// 



// cache.put(10,13);
// cache.put(3,17);
// cache.put(6,11);
// cache.put(10,5);
// cache.put(9,10);
// ret = cache.get(13);
// cache.put(2,19);
// ret = cache.get(2);
// ret = cache.get(3); 
// cache.put(5,25);
// ret = cache.get(8);
// cache.put(9,22);
// cache.put(5,5);
// cache.put(1,30);
// ret = cache.get(11);
// cache.put(9,12);
// ret = cache.get(7);
// ret = cache.get(5);
// ret = cache.get(8);
// ret = cache.get(9);
// cache.put(4,30);
// cache.put(9,3);
// ret = cache.get(9);
// ret = cache.get(10);
// ret = cache.get(10);
// cache.put(6,14);
// cache.put(3,1);
// ret = cache.get(3);
// cache.put(10,11);
// ret = cache.get(8);
// cache.put(2,14);
// ret = cache.get(1);
// ret = cache.get(5);
// ret = cache.get(4);
// cache.put(11,4);
// cache.put(12,24);
// cache.put(5,18);
// ret = cache.get(13);
// cache.put(7,23);
// ret = cache.get(8);
// ret = cache.get(12);
// cache.put(3,27);
// cache.put(2,12);
// ret = cache.get(5);
// cache.put(2,9);
// cache.put(13,4);
// cache.put(8,18);
// cache.put(1,7);
// ret = cache.get(6);
// cache.put(9,29);
// cache.put(8,21);
// ret = cache.get(5);
// cache.put(6,30);
// cache.put(1,12);
// ret = cache.get(10);
// cache.put(4,15);
// cache.put(7,22);
// cache.put(11,26);
// cache.put(8,17);
// cache.put(9,29);
// ret = cache.get(5);
// cache.put(3,4);
// cache.put(11,30);
// ret = cache.get(12);
// cache.put(4,29);
// ret = cache.get(3);
// ret = cache.get(9);
// ret = cache.get(6);
// cache.put(3,4);
// ret = cache.get(1);
// ret = cache.get(10);
// cache.put(3,29);
// cache.put(10,28);
// cache.put(1,20);
// cache.put(11,13);
// ret = cache.get(3);
// cache.put(3,12);
// cache.put(3,8);
// cache.put(10,9);
// cache.put(3,26);
// ret = cache.get(8);
// ret = cache.get(7);
// ret = cache.get(5);
// cache.put(13,17);
// cache.put(2,27);
// cache.put(11,15);
// ret = cache.get(12);
// cache.put(9,19);
// cache.put(2,15);
// cache.put(3,16);
// ret = cache.get(1);
// cache.put(12,17);
// cache.put(9,1);
// cache.put(6,19);
// ret = cache.get(4);
// ret = cache.get(5);
// ret = cache.get(5);
// cache.put(8,1);
// cache.put(11,7);
// cache.put(5,2);
// cache.put(9,28);
// ret = cache.get(1);
// cache.put(2,2);
// cache.put(7,4);
// cache.put(4,22);
// cache.put(7,24);
// cache.put(9,26);
// cache.put(13,28);
// cache.put(11,26);

/************************************/
