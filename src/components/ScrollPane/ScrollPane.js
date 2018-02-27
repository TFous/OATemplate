"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/27.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var ScrollPane_vue_1 = require("./ScrollPane.vue");
var padding = 15; // tag's padding
var ScrollPane = (function (_super) {
    tslib_1.__extends(ScrollPane, _super);
    function ScrollPane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.left = 0;
        return _this;
    }
    ScrollPane.prototype.handleScroll = function (e) {
        var eventDelta = e.wheelDelta || -e.deltaY * 3;
        var $container = this.$refs.scrollContainer;
        var $containerWidth = $container.offsetWidth;
        var $wrapper = this.$refs.scrollWrapper;
        var $wrapperWidth = $wrapper.offsetWidth;
        if (eventDelta > 0) {
            this.left = Math.min(0, this.left + eventDelta);
        }
        else {
            if ($containerWidth - padding < $wrapperWidth) {
                if (this.left < -($wrapperWidth - $containerWidth + padding)) {
                    this.left = this.left;
                }
                else {
                    this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding);
                }
            }
            else {
                this.left = 0;
            }
        }
    };
    ScrollPane.prototype.moveToTarget = function ($target) {
        var $container = this.$refs.scrollContainer;
        var $containerWidth = $container.offsetWidth;
        var $targetLeft = $target.offsetLeft;
        var $targetWidth = $target.offsetWidth;
        if ($targetLeft < -this.left) {
            // tag in the left
            this.left = -$targetLeft + padding;
        }
        else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
            // tag in the current view
            // eslint-disable-line
        }
        else {
            // tag in the right
            this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding);
        }
    };
    return ScrollPane;
}(base_1["default"]));
ScrollPane = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'ScrollPane',
        mixins: [ScrollPane_vue_1["default"]]
    })
], ScrollPane);
exports["default"] = ScrollPane;
//# sourceMappingURL=ScrollPane.js.map