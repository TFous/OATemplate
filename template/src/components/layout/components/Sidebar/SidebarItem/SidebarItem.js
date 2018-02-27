"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var SidebarItem_vue_1 = require("./SidebarItem.vue");
// import { generateTitle } from 'utils/i18n'
var SidebarItem = (function (_super) {
    tslib_1.__extends(SidebarItem, _super);
    function SidebarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SidebarItem.prototype.generateTitle = function (title) {
        return title; // $t :this method from vue-i18n ,inject in @/lang/index.js
    };
    return SidebarItem;
}(base_1["default"]));
tslib_1.__decorate([
    vue_property_decorator_1.Prop()
], SidebarItem.prototype, "routes");
SidebarItem = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'SidebarItem',
        mixins: [SidebarItem_vue_1["default"]]
    })
], SidebarItem);
exports["default"] = SidebarItem;
//# sourceMappingURL=SidebarItem.js.map