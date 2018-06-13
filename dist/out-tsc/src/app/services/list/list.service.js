"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var moment = require("moment");
var uuidv1 = require('uuid/v1');
var models_1 = require("src/app/models");
var ListService = /** @class */ (function () {
    function ListService() {
        this.$filter = new Subject_1.Subject();
        this.pageSizeOptions = [5, 10, 25, 50];
        this.defaultOrderActive = 'published';
        this.defaultOrderDirection = 'asc';
    }
    ListService.prototype.fetch = function () {
        return models_1.Storage.getItem('list');
    };
    ListService.prototype.create = function (data) {
        data.id = uuidv1();
        return this.fetch()
            .switchMap(function (list) {
            (list || []).push(data);
            return models_1.Storage.setItem('list', list);
        })
            .map(function () { return data; });
    };
    ListService.prototype.read = function (id) {
        if (!id) {
            return Observable_1.Observable.of(null);
        }
        return models_1.Storage.getItem('list').map(function (list) {
            return (list || []).find(function (next) { return next.id === id; });
        });
    };
    ListService.prototype.update = function (data) {
        return this.fetch()
            .switchMap(function (list) {
            var index = (list || []).findIndex(function (next) { return next.id === data.id; });
            if (!index) {
                return Observable_1.Observable.of(false);
            }
            list.splice(index, 1, data);
            return models_1.Storage.setItem('list', list);
        })
            .map(function () { return data; });
    };
    ListService.prototype.$delete = function (id) {
        if (!id) {
            return Observable_1.Observable.of(null);
        }
        return this.fetch()
            .switchMap(function (list) {
            list = (list || []).filter(function (next) { return next.id !== id; });
            return models_1.Storage.setItem('list', list);
        })
            .map(function () { return id; });
    };
    ListService.prototype.getPage = function (paginator, filter, order) {
        var _this = this;
        return this.fetch()
            .map(function (list) {
            var pageSize = paginator.pageSize ? paginator.pageSize : _this.pageSizeOptions[0];
            var offset = paginator.pageIndex * pageSize;
            var nextList = (list || []).filter(_this.onFilterData(filter));
            nextList.sort(_this.onSortData(order));
            return {
                list: nextList.slice(offset, offset + pageSize),
                size: nextList.length
            };
        });
    };
    ListService.prototype.onFilterData = function (filter) {
        var filterSearch = filter.search ? filter.search.toLowerCase() : null;
        return function (data) {
            if (filter.category && filter.category !== data.genre.category) {
                return false;
            }
            if (filter.genre && filter.genre !== data.genre.name) {
                return false;
            }
            if (filter.search &&
                (data.name.toLowerCase().indexOf(filterSearch) === -1 &&
                    data.author.name.toLowerCase().indexOf(filterSearch) === -1)) {
                return false;
            }
            return true;
        };
    };
    ListService.prototype.onSortData = function (order) {
        var active = order.active ? order.active : this.defaultOrderActive;
        var direction = order.direction ? order.direction : this.defaultOrderDirection;
        var asc = direction === 'asc' ? 1 : -1;
        var desc = direction === 'desc' ? 1 : -1;
        switch (active) {
            case 'published': return this.onSortPublished('published', asc, desc);
            case 'author.name': return this.onSortAuthor('name', asc, desc);
            default: return this.onSortDefault(order.active, asc, desc);
        }
    };
    ListService.prototype.onSortDefault = function (key, asc, desc) {
        return function (prev, next) {
            if (prev[key] === next[key]) {
                return 0;
            }
            return prev[key] > next[key] ? asc : desc;
        };
    };
    ListService.prototype.onSortAuthor = function (key, asc, desc) {
        return function (prev, next) {
            if (prev.author[key] === next.author[key]) {
                return 0;
            }
            return prev.author[key] > next.author[key] ? asc : desc;
        };
    };
    ListService.prototype.onSortPublished = function (key, asc, desc) {
        return function (prev, next) {
            if (!prev.timestamp) {
                prev.timestamp = moment(prev.published).valueOf();
            }
            if (!next.timestamp) {
                prev.timestamp = moment(next.published).valueOf();
            }
            if (prev.timestamp === next.timestamp) {
                return 0;
            }
            return prev.timestamp > next.timestamp ? asc : desc;
        };
    };
    ListService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map