"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var entry_vue_1 = require("./entry.vue");
var Index = (function (_super) {
    tslib_1.__extends(Index, _super);
    function Index() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Index.prototype.mounted = function () {
        var a = ['a', 'b', 'c'];
        var iterator = a.entries();
        console.log(iterator.next().value); // [0, 'a']
        console.log(iterator.next().value); // [1, 'b']
        console.log(iterator.next().value); // [2, 'c']
    };
    return Index;
}(base_1["default"]));
Index = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'entry',
        mixins: [entry_vue_1["default"]]
    })
], Index);
exports["default"] = Index;
//# sourceMappingURL=entry.js.map