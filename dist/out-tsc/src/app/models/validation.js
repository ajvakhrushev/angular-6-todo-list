"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
function urlValidator(control) {
    if (!control.value) {
        return null;
    }
    return URL.test(control.value) ? null : { url: true };
}
exports.urlValidator = urlValidator;
//# sourceMappingURL=validation.js.map