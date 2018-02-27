"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var Sidebar_vue_1 = require("./Sidebar.vue");
var SidebarItem_1 = require("./SidebarItem/SidebarItem");
var ScrollBar_1 = require("components/ScrollBar");
var router_1 = require("router");
var Sidebar = (function (_super) {
    tslib_1.__extends(Sidebar, _super);
    function Sidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permission_routers = router_1.routers;
        return _this;
    }
    Object.defineProperty(Sidebar.prototype, "sidebar", {
        get: function () {
            return this.$store.getters['app/sidebar'];
        },
        enumerable: true,
        configurable: true
    });
    return Sidebar;
}(base_1["default"]));
Sidebar = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'Sidebar',
        mixins: [Sidebar_vue_1["default"]],
        components: {
            SidebarItem: SidebarItem_1["default"],
            ScrollBar: ScrollBar_1["default"]
        }
    })
], Sidebar);
exports["default"] = Sidebar;
//# sourceMappingURL=Sidebar.js.map