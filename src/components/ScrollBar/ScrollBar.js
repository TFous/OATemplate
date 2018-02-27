"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var ScrollBar_vue_1 = require("./ScrollBar.vue");
var delta = 15;
var ScrollBar = (function (_super) {
    tslib_1.__extends(ScrollBar, _super);
    function ScrollBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.top = 0;
        return _this;
    }
    ScrollBar.prototype.handleScroll = function (e) {
        var eventDelta = e.wheelDelta || -e.deltaY * 3;
        var $container = this.$refs.scrollContainer;
        var $containerHeight = $container.offsetHeight;
        var $wrapper = this.$refs.scrollWrapper;
        var $wrapperHeight = $wrapper.offsetHeight;
        if (eventDelta > 0) {
            this.top = Math.min(0, this.top + eventDelta);
        }
        else {
            if ($containerHeight - delta < $wrapperHeight) {
                if (this.top < -($wrapperHeight - $containerHeight + delta)) {
                    this.top = this.top;
                }
                else {
                    this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta);
                }
            }
            else {
                this.top = 0;
            }
        }
    };
    return ScrollBar;
}(base_1["default"]));
ScrollBar = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'ScrollBar',
        mixins: [ScrollBar_vue_1["default"]]
    })
], ScrollBar);
exports["default"] = ScrollBar;
//# sourceMappingURL=ScrollBar.js.map