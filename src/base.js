/**
 * 所有组件的基类
 * @author Allenice
 * @since 2017-06-30 05:31:10
 */
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var vue_1 = require("vue");
var api_1 = require("api");
var api_service_1 = require("api-service");
var Base = (function (_super) {
    tslib_1.__extends(Base, _super);
    function Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.api = api_1["default"];
        _this.apiService = api_service_1["default"];
        return _this;
    }
    return Base;
}(vue_1["default"]));
exports["default"] = Base;
//# sourceMappingURL=base.js.map