/**
 * Create an object with values equal to its key names.
 */
"use strict";
exports.__esModule = true;
function default_1(obj) {
    var ret = {};
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = key;
        }
    }
    return ret;
}
exports["default"] = default_1;
//# sourceMappingURL=keymirror.js.map