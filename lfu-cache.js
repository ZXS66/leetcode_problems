"use strict";

class CacheUsage {
	constructor(key) {
		this.key = key;
		this.hits = 0;
		this.recentlyUsedTime = Date.now();
	}
	/** increment hits, update recentlyUsedTime */
	hit() {
		this.hits++;
		this.recentlyUsedTime = Date.now();
	}
}

function sortCacheUsage(u1, u2) {
	return u1.hits === u2.hits ? u1.recentlyUsedTime - u2.recentlyUsedTime : u1.hits - u2.hits;
}

/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
	this.capacity = capacity > 0 ? capacity : 0;
	this.store = new Map();
	//metadata for cache usage (hits, recentlyUsedTime)
	this.usage = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
	// return this.store.has(key)?this.store.get(key):-1;
	if (!this.store.has(key))
		return -1;
	// update usage
	this.usage.get(key).hit();
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
		this.usage.get(key).hit();
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
		this.usage.set(key, new CacheUsage(key));
	}
};

exports.LFUCache = LFUCache;

/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = Object.create(LFUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */