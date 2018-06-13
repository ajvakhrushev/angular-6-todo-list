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
var forms_1 = require("@angular/forms");
var isEqual = require('lodash.isequal');
var services_1 = require("src/app/services");
var ListFilterComponent = /** @class */ (function () {
    function ListFilterComponent(listService, genreService) {
        var _this = this;
        this.listService = listService;
        this.genreService = genreService;
        this.genres = [];
        this.categories = [];
        this.formGroup = new forms_1.FormGroup({
            search: new forms_1.FormControl(''),
            genre: new forms_1.FormControl(null),
            category: new forms_1.FormControl(null)
        });
        this.formGroup.valueChanges.subscribe(function (value) {
            console.log(_this.formGroup.value);
            _this.listService.$filter.next(_this.formGroup.value);
        });
        this.filterSubscription = this.listService.$filter.subscribe(function (data) {
            if (isEqual(data, _this.formGroup.value)) {
                return;
            }
            _this.formGroup.setValue(data);
        });
    }
    ListFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.genreService.getGenres().subscribe(function (data) { return _this.genres = data; });
        this.genreService.getCategories().subscribe(function (data) { return _this.categories = data; });
    };
    ListFilterComponent.prototype.ngOnDestroy = function () {
        this.filterSubscription.unsubscribe();
    };
    ListFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-list-filter',
            templateUrl: './list-filter.component.html',
            styleUrls: ['./list-filter.component.css']
        }),
        __metadata("design:paramtypes", [services_1.ListService,
            services_1.GenreService])
    ], ListFilterComponent);
    return ListFilterComponent;
}());
exports.ListFilterComponent = ListFilterComponent;
//# sourceMappingURL=list-filter.component.js.map