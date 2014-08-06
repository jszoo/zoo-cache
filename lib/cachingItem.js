/*
* cachingItem
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.8.6
*/

'use strict';

var utils = require('zoo-utils');

var cachingItem = module.exports = function(value, expire, notify) {
    this._value = value;
    this._expire = expire;
    this._notify = notify;
};

cachingItem.prototype = {

    _value: null, _expire: null, _notify: null,

    constructor: cachingItem, className: 'cachingItem',

    getValue: function () {
        return this._value;
    },

    isExpired: function() {
        return (utils.isDate(this._expire) && new Date() >= this._expire);
    },

    doNotify: function(action) {
        if (utils.isFunction(this._notify)) {
            this._notify({
                value: this._value,
                action: action
            });
        }
    }
};
