"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var material_1 = require("@angular/material");
var app_component_1 = require("src/app/app.component");
var components_1 = require("src/app/components");
var models_1 = require("src/app/models");
var services_1 = require("src/app/services");
var pipes_1 = require("src/app/pipes");
// import { SomeDirective } from 'src/app/directives';
var appRoutes = [
    { path: 'list', component: components_1.ListPageComponent },
    { path: 'detail/:id', component: components_1.DetailComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: '**', component: components_1.PageNotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                components_1.PageNotFoundComponent,
                components_1.HeaderComponent,
                components_1.FooterComponent,
                components_1.ListComponent,
                components_1.ListItemComponent,
                components_1.ListFilterComponent,
                components_1.DetailComponent,
                pipes_1.TranslatePipe,
                components_1.ListPageComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(appRoutes),
                material_moment_adapter_1.MatMomentDateModule,
                material_1.MatDatepickerModule,
                material_1.MatToolbarModule,
                material_1.MatSelectModule,
                material_1.MatButtonModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatInputModule,
                material_1.MatIconModule
            ],
            providers: [
                services_1.TranslationService,
                services_1.ListService,
                pipes_1.TranslatePipe
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function initializeData() {
    var keys = ['translations', 'list', 'genres', 'categories'];
    var storage = 'offline';
    if (typeof window !== 'undefined' && ('localStorage' in window) && (localStorage !== undefined) && (localStorage !== null)) {
        storage = 'localStorage';
    }
    models_1.Storage.setStorage(storage);
    keys.forEach(function (next) {
        models_1.Storage.getItem(next).subscribe(function (data) {
            if (data !== null) {
                return;
            }
            models_1.Storage.setItem(next, require("src/assets/fixture/" + next + ".json"));
        });
    });
}
initializeData();
//# sourceMappingURL=app.module.js.map