/*
* all
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.8.4
*/

'use strict';

var cache = require('..');
var assert = require('assert');
var animals = cache.region('animals');

describe('cache', function() {
    
    it('.set 2 items', function() {
        assert.equal(animals.set('cat1', 'cat1'), animals);
        assert.equal(animals.set('cat2', 'cat2'), animals);
    });

    it('.get one of the 2 item', function() {
        assert.equal(animals.get('cat1'), 'cat1');
    });

    it('.set 1 item with expire', function() {
        animals.set('cat3', 'cat3', new Date(), function(param) {
            assert.equal(param.action, 'expire');
            assert.equal(param.value, 'cat3');
        });
    });

    it('.get the expired item', function() {
        assert.equal(animals.get('cat3'), null);
    });

    it('.all', function() {
        assert.equal(animals.all()['cat1'], 'cat1');
    });

    it('.count', function() {
        assert.equal(animals.count(), 2);
    });

    it('.exists', function() {
        assert.equal(animals.exists('cat1'), true);
    });

    it('.remove', function() {
        assert.equal(animals.remove('cat1'), true);
    });

    it('.remove not exist', function() {
        assert.equal(animals.remove('cat1'), false);
    });

    it('.exists again after remove', function() {
        assert.equal(animals.exists('cat1'), false);
    });

    it('.clear', function() {
        assert.equal(animals.clear(), animals);
    });

    it('.count again after clear', function() {
        assert.equal(animals.count(), 0);
    });
});

describe('store', function() {

    var newStore = new cache.MemoryStore();
    cache.defaultStore(newStore);
    var store = animals.sto();

    it('.defaultStore', function() {
        assert.equal(store, newStore);
    });
    
    it('.set', function() {
        assert.equal(store.set('test_region', 'key', 'value'), store);
        assert.equal(store.set('test_region', 'key2', 'value2'), store);
    });

    it('.get', function() {
       assert.equal(store.get('test_region', 'key'), 'value');
    });

    it('.exists', function() {
        assert.equal(store.exists('test_region', 'key'), true);
    });

    it('.remove', function() {
        assert.equal(store.remove('test_region', 'key'), true);
    });

    it('.exists again after remove', function() {
        assert.equal(store.exists('test_region', 'key'), false);
    });

    it('.clear', function() {
        assert.equal(store.clear('test_region'), store);
    });
});
