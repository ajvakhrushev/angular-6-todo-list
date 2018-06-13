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
var Subject_1 = require("rxjs/Subject");
var models_1 = require("src/app/models");
var DEFAULT_LANG = 'en';
var TranslationService = /** @class */ (function () {
    function TranslationService() {
        var _this = this;
        this.lang = DEFAULT_LANG;
        this.$languages = new Subject_1.Subject();
        this.$lang = new Subject_1.Subject();
        this.$lang.next(DEFAULT_LANG);
        this.getTranslations().subscribe(function (data) {
            _this.translations = data || {};
            _this.translation = _this.translations[_this.lang] || null;
        });
    }
    TranslationService.prototype.setLanguage = function (value) {
        var lang = value || DEFAULT_LANG;
        this.lang = lang;
        this.translation = this.translations[this.lang] || null;
        this.$lang.next(lang);
    };
    TranslationService.prototype.getLanguage = function () {
        return this.lang;
    };
    TranslationService.prototype.getTranslations = function () {
        return models_1.Storage.getItem('translations');
    };
    TranslationService.prototype.get = function (value) {
        return this.translation && value ? this.translation[value] : null;
    };
    TranslationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TranslationService);
    return TranslationService;
}());
exports.TranslationService = TranslationService;
//# sourceMappingURL=translation.service.js.map