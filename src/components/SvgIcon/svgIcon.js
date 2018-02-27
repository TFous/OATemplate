"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/27.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var svgIcon_vue_1 = require("./svgIcon.vue");
var delta = 15;
var svgIcon = (function (_super) {
    tslib_1.__extends(svgIcon, _super);
    function svgIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(svgIcon.prototype, "iconName", {
        get: function () {
            return "#icon-" + this.iconClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(svgIcon.prototype, "svgClass", {
        get: function () {
            if (this.className) {
                return 'svg-icon ' + this.className;
            }
            else {
                return 'svg-icon';
            }
        },
        enumerable: true,
        configurable: true
    });
    return svgIcon;
}(base_1["default"]));
tslib_1.__decorate([
    vue_property_decorator_1.Prop()
], svgIcon.prototype, "iconClass");
tslib_1.__decorate([
    vue_property_decorator_1.Prop()
], svgIcon.prototype, "className");
svgIcon = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'svg-icon',
        mixins: [svgIcon_vue_1["default"]]
    })
], svgIcon);
exports["default"] = svgIcon;
//# sourceMappingURL=svgIcon.js.map