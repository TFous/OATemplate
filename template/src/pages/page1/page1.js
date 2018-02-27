"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var page1_vue_1 = require("./page1.vue");
var Page1 = (function (_super) {
    tslib_1.__extends(Page1, _super);
    function Page1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Page1;
}(base_1["default"]));
Page1 = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'page1',
        mixins: [page1_vue_1["default"]]
    })
], Page1);
exports["default"] = Page1;
//# sourceMappingURL=page1.js.map