"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var genre_service_1 = require("./genre.service");
describe('GenreService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [genre_service_1.GenreService]
        });
    });
    it('should be created', testing_1.inject([genre_service_1.GenreService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=genre.service.spec.js.map