"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var translation_service_1 = require("./translation.service");
describe('TranslationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [translation_service_1.TranslationService]
        });
    });
    it('should be created', testing_1.inject([translation_service_1.TranslationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=translation.service.spec.js.map