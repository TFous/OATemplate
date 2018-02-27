"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var layout_vue_1 = require("./layout.vue");
var Sidebar_1 = require("./components/Sidebar");
var appMain_1 = require("./components/appMain");
var navbar_1 = require("./components/navbar");
var tagViews_1 = require("./components/tagViews");
var layout = (function (_super) {
    tslib_1.__extends(layout, _super);
    function layout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sidebar = _this.$store.state.app.sidebar;
        return _this;
        // get sidebar () {
        //     return this.$store.state.app.sidebar
        // }
    }
    return layout;
}(base_1["default"]));
layout = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'page-layout',
        mixins: [layout_vue_1["default"]],
        components: {
            Navbar: navbar_1["default"],
            Sidebar: Sidebar_1["default"],
            AppMain: appMain_1["default"],
            tagViews: tagViews_1["default"]
        }
    })
], layout);
exports["default"] = layout;
//# sourceMappingURL=layout.js.map