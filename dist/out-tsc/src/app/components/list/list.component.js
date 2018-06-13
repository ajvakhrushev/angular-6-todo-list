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
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/startWith");
var cloneDeep = require('lodash.clonedeep');
var material_1 = require("@angular/material");
var services_1 = require("src/app/services");
var ListComponent = /** @class */ (function () {
    function ListComponent(router, listService) {
        this.router = router;
        this.listService = listService;
        this.displayedColumns = ['update', 'name', 'author.name', 'genre.name', 'genre.category', 'published', 'likes', 'delete'];
        this.data = [];
        this.resultsLength = 0;
        this.isLoading = true;
        this.isRateLimitReached = false;
        this.filter = {};
        this.pageSizeOptions = cloneDeep(this.listService.pageSizeOptions);
        this.refresh = this.refresh.bind(this);
        this.onGetDataSuccess = this.onGetDataSuccess.bind(this);
        this.onGetDataError = this.onGetDataError.bind(this);
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        this.listService.$filter.subscribe(function (data) {
            _this.filter = data;
            _this.paginator.pageIndex = 0;
        });
        rxjs_1.merge(this.paginator.page, this.listService.$filter, this.sort.sortChange)
            .startWith([{}, {}, {}])
            .switchMap(function () {
            _this.isLoading = true;
            return _this.listService.getPage(_this.paginator, _this.filter, _this.sort);
        })
            .subscribe(this.onGetDataSuccess, this.onGetDataError);
    };
    ListComponent.prototype.updateItem = function (id) {
        if (!id) {
            return;
        }
        this.router.navigate(['detail', id]);
    };
    ListComponent.prototype.deleteItem = function (id) {
        var _this = this;
        this.isLoading = true;
        this.listService
            .$delete(id)
            .switchMap(function () {
            return _this.listService.getPage(_this.paginator, _this.filter, _this.sort);
        })
            .subscribe(this.onGetDataSuccess, this.onGetDataError);
    };
    ListComponent.prototype.refresh = function () { };
    ListComponent.prototype.onGetDataSuccess = function (data) {
        this.isLoading = false;
        this.resultsLength = data.size;
        this.data = data.list;
    };
    ListComponent.prototype.onGetDataError = function (error) {
        this.isLoading = false;
        this.resultsLength = 0;
        this.data = [];
        console.log(error);
    };
    __decorate([
        core_1.ViewChild(material_1.MatTable),
        __metadata("design:type", material_1.MatTable)
    ], ListComponent.prototype, "table", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ListComponent.prototype, "sort", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            services_1.ListService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map