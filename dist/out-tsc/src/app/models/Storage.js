"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
require("rxjs/add/observable/of");
var OfflineStorage = /** @class */ (function () {
    function OfflineStorage() {
        this.items = {};
    }
    OfflineStorage.prototype.setItem = function (key, value) {
        this.items[key] = value;
        return this.items[key] || null;
    };
    OfflineStorage.prototype.getItem = function (key) {
        return key ? (this.items[key] || null) : null;
    };
    OfflineStorage.prototype.clear = function () {
        this.items = {};
    };
    return OfflineStorage;
}());
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.getValue = function (key) {
        var value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };
    LocalStorage.prototype.setItem = function (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
        return this.getValue(key) || null;
    };
    LocalStorage.prototype.getItem = function (key) {
        return key ? (this.getValue(key) || null) : null;
    };
    LocalStorage.prototype.clear = function () {
        window.localStorage.clear();
    };
    return LocalStorage;
}());
var storage;
var Storage;
(function (Storage) {
    function setStorage(key) {
        if (!key) {
            storage = new LocalStorage();
        }
        switch (key) {
            case 'offline':
                storage = new OfflineStorage();
                break;
            default: storage = new LocalStorage();
        }
    }
    Storage.setStorage = setStorage;
    function setItem(key, value) {
        storage.setItem(key, value);
        return rxjs_1.Observable.of(storage.getItem(key));
    }
    Storage.setItem = setItem;
    function getItem(key) {
        return rxjs_1.Observable.of(storage.getItem(key));
    }
    Storage.getItem = getItem;
    function clear() {
        storage.clear();
        return rxjs_1.Observable.of(true);
    }
    Storage.clear = clear;
})(Storage = exports.Storage || (exports.Storage = {}));
//# sourceMappingURL=Storage.js.map