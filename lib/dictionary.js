/*
* dictionary
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.7.16
*/

'use strict';

var utils = require('zoo-utils');

var dictionary = module.exports = function() {
    this._data = {};
};

dictionary.prototype = {

    _data: null,

    constructor: dictionary,

    all: function() {
        return this._data;
    },

    get: function(key) {
        key = utils.formalStr(key);
        return this._data[key];
    },

    set: function(key, val) {
        key = utils.formalStr(key);
        this._data[key] = val;
    },

    remove: function(key) {
        key = utils.formalStr(key);
        return delete this._data[key];
    },

    exists: function(key) {
        key = utils.formalStr(key);
        return (key in this._data);
    },

    count: function() {
        return utils.propCount(this.all());
    },

    clear: function() {
        this._data = {};
    }

};
