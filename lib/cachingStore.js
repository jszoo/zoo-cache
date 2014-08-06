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
    this.events = new events.EventEmitter();
};

cachingStore.prototype = {

    _data: null, events: null,

    constructor: cachingStore, className: 'cachingStore',

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

    set: function(regionName, key, val) {
        regionName = utils.formalStr(regionName);
        var region = this._data[regionName];
        if (!region) { region = this._data[regionName] = {}; }
        region[utils.formalStr(key)] = val;
    },

    remove: function(regionName, key) {
        regionName = utils.formalStr(regionName);
        if (key === undefined) {
            return delete this._data[regionName];
        } else {
            var region = this._data[regionName];
            if (region) {
                key = utils.formalStr(key);
                return delete region[key];
            } else {
                return false;
            }
        }
    },

    exists: function(regionName, key) {
        regionName = utils.formalStr(regionName);
        if (key === undefined) {
            return (regionName in this._data);
        } else {
            var region = this._data[regionName];
            key = utils.formalStr(key);
            return (region && key in region);
        }
    },

    clear: function(regionName) {
        if (regionName === undefined) {
            this._data = {};
            return true;
        } else {
            regionName = utils.formalStr(regionName);
            return delete this._data[regionName];
        }
    }
};
