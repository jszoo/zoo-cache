/*
* cachingStore
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.7.16
*/

'use strict';

var caching = require('./caching');
caching.MemoryStore = require('./cachingStore');

// export
module.exports = caching;
