"use strict";

class CacheUsage {
	constructor(key, counter) {
		this.key = key;
		/** the amount of hits */
		this.hits = 0;
		/** save counter state for the last hit  */
		this.lastHitNo = counter;
	}
	/** increment hits, update lastHitNo */
	hit(counter) {
		this.hits++;
		this.lastHitNo = counter;
	}
}
function sortCacheUsage(u1, u2) {
	return u1.hits === u2.hits ? u1.lastHitNo - u2.lastHitNo : u1.hits - u2.hits;
}

/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
	this.capacity = capacity > 0 ? capacity : 0;
	this.store = new Map();
	//metadata for cache usage (hits, lastHitNo)
	this.usage = new Map();
	/** how many times the get function called */
	this.counter = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
	if (!this.store.has(key))
		return -1;
	// update usage
	this.usage.get(key).hit(++this.counter);
	return this.store.get(key);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
	if (this.capacity === 0){
		// NO cache
		return;
	}
	if (this.store.has(key)) {
		// update value if the key is already exist
		this.store.set(key, value);
		this.usage.get(key).hit(++this.counter);
	} else {
		// insert value with new key
		if (this.store.size === this.capacity) {
			// if reach capacity, evict the least recently used item.
			let tmpArray = [];
			for (let value of this.usage.values()) {
				tmpArray.push(value);
			}
			let toBeEvicted = tmpArray.sort(sortCacheUsage)[0];
			if (toBeEvicted) {
				this.store.delete(toBeEvicted.key);
				this.usage.delete(toBeEvicted.key);
			}
		}
		this.store.set(key, value);
		this.usage.set(key, new CacheUsage(key, ++this.counter));
	}
};

exports.LFUCache = LFUCache;

/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = Object.create(LFUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */