/*
* caching
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.6.24
*/

'use strict';

var utils = require('zoo-utils'),
    cachingItem = require('./cachingItem'),
    cachingStore = require('./cachingStore');

var instances, defaultStore;

var caching = module.exports = function(set) {
    utils.extend(this, set);
    if (!this.region) {
        throw new Error('Caching region is required');
    }
    if (instances) {
        var instance = instances.get(this.region);
        if (instance) { return instance; }
        instances.set(this.region, this);
    }
};

caching.region = function(region, store) {
    return new caching({
        region: region,
        store: store
    });
};

caching.defaultStore = function(sto) {
    return (sto === undefined) ? (defaultStore) : (defaultStore = sto);
};

caching.prototype = {

    region: null, store: null, _cachedAll: null, _hasExpireItem: false,

    constructor: caching,

    sto: function(o) {
        return (o === undefined) ? (this.store || defaultStore) : (this.store = o, this);
    },

    all: function() {
        if (!this._hasExpireItem && this._cachedAll) {
            return this._cachedAll;
        }
        var ret = {}, self = this;
        utils.each(this.sto().get(this.region), function(key) {
            var val = self.get(key);
            if (val !== undefined) { ret[key] = val; }
        });
        if (!this._hasExpireItem) {
            this._cachedAll = ret;
        }
        return ret;
    },

    get: function(key) {
        var o = this.sto().get(this.region, key);
        if (o instanceof cachingItem) {
            if (o.isExpired()) {
                return (this.remove(key, 'expire'), undefined);
            } else {
                return o.getValue();
            }
        }
        return o;
    },

    set: function(key, value, expire, notify) {
        value = (value === undefined ? null : value);
        var o = (expire || notify) ? new cachingItem(value, expire, notify) : value;
        this._hasExpireItem = (this._hasExpireItem || !!expire);
        // 3 steps
        this._cachedAll = null;
        this.sto().emit('set', { region: this.region, key: key, value: value });
        this.sto().set(this.region, key, o);
        return this;
    },

    remove: function(key, action) {
        var o = this.sto().get(this.region, key);
        if (o instanceof cachingItem) {
            o.doNotify(action || 'remove');
        }
        // 3 steps
        this._cachedAll = null;
        this.sto().emit('remove', { region: this.region, key: key });
        return this.sto().remove(this.region, key);
    },

    count: function() {
        return utils.propCount(this.all());
    },

    exists: function(key) {
        return this.sto().exists(this.region, key);
    },

    clear: function() {
        // 3 steps
        this._cachedAll = null;
        this.sto().emit('clear', { region: this.region });
        this.sto().remove(this.region);
        return this;
    }
};

// init
caching.defaultStore(new cachingStore());
instances = caching.region('caching-instances');
// end
