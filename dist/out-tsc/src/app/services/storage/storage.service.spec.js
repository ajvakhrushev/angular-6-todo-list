"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var storage_service_1 = require("./storage.service");
describe('StorageService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [storage_service_1.StorageService]
        });
    });
    it('should be created', testing_1.inject([storage_service_1.StorageService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=storage.service.spec.js.map