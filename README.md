zoo-cache
=========

Universal caching solution

Features
---------
+ Customizable inner data store
+ Customizable inner data region
+ Universal operating api
+ Support cache item expire and expire callback
+ Events on operating cache item

Installation
-------------

```shell
$ npm install zoo-cache
```

Data store
-----------
Store is the inner core data storage. We can implement it to store data in memory or database etc. There is already a **MemoryStore** builtin in this solution. Will use MemoryStore when user doesn't specified the store option.

```javascript
var cache = require('zoo-cache');
// change default store
cache.defaultStore(new MongoStore());
```

Data region
------------
Region is a subset of the data store. 

```javascript
var cache = require('zoo-cache');
// animals set
var animals = cache.region('animals-cache');
// or specified a store
var animals = cache.region('animals-cache', new MongoStore());
```

Universal api
---------------
Friendly and simply api.

```javascript
var cache = require('zoo-cache');
// animals set
var animals = cache.region('animals-cache');
// api list
animals.sto(); // get/set inner store of current region
animals.set('cat', 'cat-mvc');
animals.get('cat');
animals.remove('cat');
animals.exists('cat');
animals.all();
animals.count();
animals.clear();
```

Caching expire
---------------
User can specified a absolute expire date to cache item and a expire callback also available.

```javascript
// full api
animals.set(key, val, expire, notify);
// example
animals.set('cat', 'cat-mvc', new Date(), function(item) {
    console.log(item + ' has expired');
});
```

Store events
-------

```javascript
animals.sto().events.on('set', function(params) { });
animals.sto().events.on('remove', function(params) { });
animals.sto().events.on('clear', function() { });
```

Tests
-------------

```shell
$ npm install
$ npm test
```

License
--------

[MIT](LICENSE)
