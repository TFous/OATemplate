"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var login_vue_1 = require("./login.vue");
var login_1 = require("components/login");
var Login = (function (_super) {
    tslib_1.__extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Login;
}(base_1["default"]));
Login = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'page-login',
        mixins: [login_vue_1["default"]],
        components: {
            login: login_1["default"]
        }
    })
], Login);
exports["default"] = Login;
//# sourceMappingURL=login.js.map