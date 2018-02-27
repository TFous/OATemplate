"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2018/1/3.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var error404_vue_1 = require("./error404.vue");
var error404 = (function (_super) {
    tslib_1.__extends(error404, _super);
    function error404() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(error404.prototype, "message", {
        get: function () {
            return '特朗普说这个页面你不能进......';
        },
        enumerable: true,
        configurable: true
    });
    return error404;
}(base_1["default"]));
error404 = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'error404',
        mixins: [error404_vue_1["default"]]
    })
], error404);
exports["default"] = error404;
//# sourceMappingURL=error404.js.map