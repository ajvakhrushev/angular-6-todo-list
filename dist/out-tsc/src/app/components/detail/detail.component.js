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
var forms_1 = require("@angular/forms");
var cloneDeep = require('lodash.clonedeep');
var isEqual = require('lodash.isequal');
var models_1 = require("src/app/models");
var services_1 = require("src/app/services");
var pipes_1 = require("src/app/pipes");
var DetailComponent = /** @class */ (function () {
    function DetailComponent(router, route, listService, genreService, translatePipe) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.listService = listService;
        this.genreService = genreService;
        this.translatePipe = translatePipe;
        this.isLoading = false;
        this.genres = [];
        this.categories = [];
        this.strategies = [
            {
                key: 'create',
                submitTitle: null,
                init: function (id) {
                    _this.item = {
                        id: null,
                        name: null,
                        genre: {
                            name: null,
                            category: null
                        },
                        author: {
                            name: null
                        },
                        published: null,
                        likes: null
                    };
                    _this.isLoading = false;
                },
                submit: function (data) {
                    if (!data) {
                        _this.isLoading = false;
                        return;
                    }
                    _this.listService.create(data).subscribe(function (nextData) {
                        _this.strategy = _this.strategies.find(function (next) { return next.key === 'update'; });
                        _this.mapData(nextData);
                    }, function (error) { return console.error(error); });
                }
            },
            {
                key: 'update',
                submitTitle: null,
                init: function (id) {
                    _this.listService.read(id).subscribe(_this.mapData);
                },
                submit: function (data) {
                    if (!data || isEqual(data, _this.item)) {
                        _this.isLoading = false;
                        return;
                    }
                    _this.listService.update(data).subscribe(_this.mapData);
                }
            }
        ];
        this.nameControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.coverControl = new forms_1.FormControl(null, [models_1.urlValidator]);
        this.authorNameControl = new forms_1.FormControl(null, [forms_1.Validators.required]);
        this.authorAvatarControl = new forms_1.FormControl(null, [models_1.urlValidator]);
        this.authorForm = new forms_1.FormGroup({
            name: this.authorNameControl,
            avatar: this.authorAvatarControl
        });
        this.genreForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(null, [forms_1.Validators.required]),
            category: new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        this.formGroup = new forms_1.FormGroup({
            name: this.nameControl,
            genre: this.genreForm,
            author: this.authorForm,
            published: new forms_1.FormControl(null),
            cover: this.coverControl,
            description: new forms_1.FormControl(null),
            introduction: new forms_1.FormControl(null)
        });
        var updateStategy = this.strategies.find(function (next) { return next.key === 'update'; });
        updateStategy.submitTitle = this.translatePipe.transform('detailActionUpdateButton');
        var createStategy = this.strategies.find(function (next) { return next.key === 'create'; });
        createStategy.submitTitle = this.translatePipe.transform('detailActionCreateButton');
        this.mapData = this.mapData.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (!params.id) {
                return;
            }
            var strategy;
            switch (params.id) {
                case 'create':
                    strategy = 'create';
                default:
                    strategy = 'update';
            }
            _this.strategy = _this.strategies.find(function (next) { return next.key === strategy; });
            _this.isLoading = true;
            _this.strategy.init(params.id);
        });
        this.genreService.getGenres().subscribe(function (data) { return _this.genres = data; });
        this.genreService.getCategories().subscribe(function (data) { return _this.categories = data; });
    };
    DetailComponent.prototype.mapData = function (data) {
        this.item = data;
        this.stableItem = cloneDeep(data);
        this.isLoading = false;
        this.setFormValues(this.item);
    };
    DetailComponent.prototype.setFormValues = function (data) {
        this.authorForm.setValue({
            name: data.author.name,
            avatar: data.author.avatar
        });
        this.genreForm.setValue({
            name: data.genre.name,
            category: data.genre.category
        });
        this.formGroup.setValue({
            name: data.name,
            genre: {
                name: data.genre.name,
                category: data.genre.category
            },
            author: {
                name: data.author.name,
                avatar: data.author.avatar
            },
            published: data.published,
            cover: data.cover,
            description: data.description,
            introduction: data.introduction
        });
    };
    DetailComponent.prototype.onCancel = function () {
        this.router.navigate(['/list']);
    };
    DetailComponent.prototype.onReset = function () {
        this.item = cloneDeep(this.stableItem);
        this.setFormValues(this.item);
    };
    DetailComponent.prototype.onSubmit = function () {
        var data = Object.assign({}, this.item, this.formGroup.value);
        this.isLoading = true;
        this.strategy.submit(data);
    };
    DetailComponent = __decorate([
        core_1.Component({
            selector: 'app-detail',
            templateUrl: './detail.component.html',
            styleUrls: ['./detail.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            services_1.ListService,
            services_1.GenreService,
            pipes_1.TranslatePipe])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=detail.component.js.map