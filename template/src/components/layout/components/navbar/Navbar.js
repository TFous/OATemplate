"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/26.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var Navbar_vue_1 = require("./Navbar.vue");
var personMenu_1 = require("components/personMenu");
// interface Data{
//     sidebar:object
// }
var Navbar = (function (_super) {
    tslib_1.__extends(Navbar, _super);
    function Navbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navbar.prototype.mounted = function () {
        //console.log(this.$store)
    };
    Object.defineProperty(Navbar.prototype, "sidebar", {
        get: function () {
            return this.$store.getters['app/sidebar'];
        },
        enumerable: true,
        configurable: true
    });
    Navbar.prototype.toggleSideBar = function () {
        this.$store.dispatch('app/toggleSideBar');
    };
    return Navbar;
}(base_1["default"]));
Navbar = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'Navbar',
        mixins: [Navbar_vue_1["default"]],
        components: {
            personMenu: personMenu_1["default"]
        }
    })
], Navbar);
exports["default"] = Navbar;
//# sourceMappingURL=Navbar.js.map