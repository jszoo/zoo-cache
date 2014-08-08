/*
* index
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.8.5
*/

'use strict';

var caching = require('./caching');
caching.MemoryStore = require('./cachingStore');

// export
module.exports = caching;
