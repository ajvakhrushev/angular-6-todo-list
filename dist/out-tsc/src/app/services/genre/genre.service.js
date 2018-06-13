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
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var models_1 = require("src/app/models");
var GenreService = /** @class */ (function () {
    function GenreService() {
    }
    GenreService.prototype.getGenres = function () {
        var _this = this;
        if (this.genres) {
            return Observable_1.Observable.of(this.genres);
        }
        return models_1.Storage.getItem('genres').map(function (data) {
            _this.genres = _this.onGetSelectOptions(data);
            return _this.genres;
        });
    };
    GenreService.prototype.getCategories = function () {
        var _this = this;
        if (this.categories) {
            return Observable_1.Observable.of(this.categories);
        }
        return models_1.Storage.getItem('categories').map(function (data) {
            _this.categories = _this.onGetSelectOptions(data);
            return _this.categories;
        });
    };
    GenreService.prototype.onGetSelectOptions = function (data) {
        if (data === void 0) { data = []; }
        var list = (data || []).map(function (next) { return ({ title: next, value: next }); });
        list.unshift({ title: 'None', value: null });
        return list;
    };
    GenreService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], GenreService);
    return GenreService;
}());
exports.GenreService = GenreService;
//# sourceMappingURL=genre.service.js.map