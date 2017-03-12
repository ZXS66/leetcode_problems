"use strict";

/** data model for statistics usage of cache entry */
class CacheUsage {
	constructor(key, counter) {
		this.key = key;
		/** the amount of hits */
		this.hits = 1;
		/** save counter state for the last hit  */
		this.lastHitNo = counter;
		/** last CacheUsage entry which impact is lower than current */
		this.prev = null;
		/** next CacheUsage entry which impact is higher than current */
		this.next = null;
	}
}
/** increase hits, update lastHitNo */
CacheUsage.prototype.hit = function (counter) {
	this.hits++;
	this.lastHitNo = counter;
	return this;
};
/**
 * compare with another CacheUsage by impact.
 * @param {CacheUsage} dest, destination CacheUsage to be compared
 * @return 1 if current entry is more impact than dest, 0 if they are the same(will never happen), -1 if current entry is less impact than dest
 */
CacheUsage.prototype.compare = function (dest) {
	return this.hits === dest.hits ?
		(this.lastHitNo - dest.lastHitNo > 0 ? 1 : -1) :
		(this.hits - dest.hits > 0 ? 1 : -1);
};
/** 
 * resort CacheUsage
 * 
 */
CacheUsage.prototype.resort = function (usageTable) {
	let that = this;
	if (that.next && that.compare(that.next) === 1) {
		// step 1: pick out the item and update prev and next
		if (that.prev) {
			that.prev.next = that.next;
			that.next.prev = that.prev;
		} else {
			// current one is the LFU one before updating
			usageTable.__lfu__ = that.next;
			that.next.prev = null;
		}
		// step 2: find the right location to insert
		let nx = that.next,
			pr = that.prev;
		while (nx) {
			if (that.compare(nx) === -1) {
				break;
			}
			pr = nx;
			nx = nx.next;
		}
		// step 3: insert and update prev and next
		that.prev = pr;
		that.next = nx;
		pr.next = that;
		if (nx) nx.prev = that;
	}
	return that;
}

/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
	this.capacity = capacity > 0 ? capacity : 0;
	this.store = new Map();
	//metadata for CacheUsage (hits, lastHitNo)
	this.usageTable = {
		/** reference of least recently used CacheUsage */
		__lfu__: null
	};
	/** 
	 * how many times the get function called,
	 * to record time oridinal when invoked.
	 */
	this.counter = 0;
};

/** 
 * @param {number} key, cache key
 * @return {number} cache value
 */
LFUCache.prototype.get = function (key) {
	if (!this.store.has(key))
		return -1;
	// update usageTable before return
	this.usageTable[key].hit(++this.counter).resort(this.usageTable);
	return this.store.get(key);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
	if (this.capacity === 0) {
		// NO cache
		return;
	}
	let s = this.store,
		ut = this.usageTable,
		c = ++this.counter;
	if (s.has(key)) {
		// update value if the key is already exist
		let usage = ut[key];
		// bug fix: reset hits when update value by existing key
		usage.hits = 0;
		usage.hit(c).resort(this.usageTable);
	} else {
		// insert value with new key
		if (s.size === this.capacity) {
			// if reach capacity, evict the least recently used item.
			// TODO: ut.pop()    pop the LFU item and return its key
			let k = ut.__lfu__.key;
			ut.__lfu__ = ut.__lfu__.next;
			delete ut[k];
			// end TODO
			s.delete(k);
		}
		let usage = new CacheUsage(key, c);
		// TODO: ut.push(usage)    push new CacheUsage instance into usageTable
		if (ut.__lfu__) {
			usage.next = ut.__lfu__;
			ut.__lfu__.prev = usage;
			ut.__lfu__ = ut[key] = usage;
			usage.resort(this.usageTable);
		} else { // s.size === 0
			ut.__lfu__ = ut[key] = usage;
		}
		// end TODO
	}
	s.set(key, value);
};

exports.LFUCache = LFUCache;

/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = Object.create(LFUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */