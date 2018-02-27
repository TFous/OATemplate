"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var base_1 = require("base");
var store_1 = require("store");
var api_service_1 = require("api-service");
var vue_property_decorator_1 = require("vue-property-decorator");
var app_vue_1 = require("./app.vue");
var entry_1 = require("pages/entry");
var page1_1 = require("pages/page1");
var layout_1 = require("components/layout");
var user = store_1["default"].state.auth.user;
var timestamp = (new Date()).getTime() / 1000;
var callbacktime = user.expires_at - 10;
var App = (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.mounted = function () {
        this.startSlientRenew();
    };
    App.prototype.startSlientRenew = function () {
        if (timestamp > callbacktime && timestamp < (user.expires_at - 2)) {
            api_service_1["default"].login.slientRenew();
        }
        if (timestamp < callbacktime) {
            var time = (callbacktime - timestamp) * 1000;
            setTimeout(function () {
                api_service_1["default"].login.slientRenew();
            }, time);
        }
    };
    App.prototype.routerchange = function (val, oldVal) {
        if (val.name === 'setMoney' && val.params.ClientNo === ':ClientNo') {
            this.$router.push({ path: '/setMoney/setMoney/noClient' });
        }
    };
    return App;
}(base_1["default"]));
tslib_1.__decorate([
    vue_property_decorator_1.Watch('$route')
], App.prototype, "routerchange");
App = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'page-app',
        mixins: [app_vue_1["default"]],
        components: {
            entry: entry_1["default"],
            page1: page1_1["default"],
            layout: layout_1["default"]
        }
    })
], App);
exports["default"] = App;
//# sourceMappingURL=app.js.map