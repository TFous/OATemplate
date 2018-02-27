"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var appMain_vue_1 = require("./appMain.vue");
var AppMain = (function (_super) {
    tslib_1.__extends(AppMain, _super);
    function AppMain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppMain;
}(base_1["default"]));
AppMain = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'app-main',
        mixins: [appMain_vue_1["default"]]
    })
], AppMain);
exports["default"] = AppMain;
//# sourceMappingURL=appMain.js.map