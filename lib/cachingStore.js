/*
* cachingStore
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.7.16
*/

'use strict';

var events = require('events'),
    utils = require('zoo-utils');

var cachingStore = module.exports = function() {
    this._data = {};
    cachingStore.superclass.constructor.call(this);
};

utils.inherit(cachingStore, events.EventEmitter, {

    _data: null,

    get: function(regionName, key) {
        regionName = utils.formalStr(regionName);
        var region = this._data[regionName];
        if (key === undefined) {
            return region;
        } else {
            key = utils.formalStr(key);
            return region ? region[key] : region;
        }
    },

    set: function(regionName, key, value) {
        regionName = utils.formalStr(regionName);
        var region = this._data[regionName];
        if (!region) { region = this._data[regionName] = {}; }
        value = (value === undefined) ? null : value;
        region[utils.formalStr(key)] = value;
        return this;
    },

    remove: function(regionName, key) {
        regionName = utils.formalStr(regionName);
        if (key === undefined) {
            if (this._data[regionName] !== undefined) {
                this._data[regionName] = undefined;
                return true;
            }
        } else {
            var region = this._data[regionName];
            if (region) {
                key = utils.formalStr(key);
                if (region[key] !== undefined) {
                    region[key] = undefined;
                    return true;
                }
            }
        }
        return false;
    },

    exists: function(regionName, key) {
        regionName = utils.formalStr(regionName);
        if (key === undefined) {
            if (this._data[regionName] !== undefined) {
                return true;
            }
        } else {
            var region = this._data[regionName];
            if (region) {
                key = utils.formalStr(key);
                if (region[key] !== undefined) {
                    return true;
                }
            }
        }
        return false;
    },

    clear: function(regionName) {
        if (regionName === undefined) {
            this._data = {};
        } else {
            regionName = utils.formalStr(regionName);
            if (this._data[regionName] !== undefined) {
                this._data[regionName] = undefined;
            }
        }
        return this;
    }

});
