"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/27.
 */
var vue_1 = require("vue");
var vue_property_decorator_1 = require("vue-property-decorator");
var tagViews_vue_1 = require("./tagViews.vue");
var ScrollPane_1 = require("components/ScrollPane");
var tagViews = (function (_super) {
    tslib_1.__extends(tagViews, _super);
    function tagViews() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visible = false;
        _this.top = 0;
        _this.left = 0;
        _this.selectedTag = {};
        return _this;
    }
    tagViews.prototype.mounted = function () {
        this.addViewTags();
    };
    Object.defineProperty(tagViews.prototype, "visitedViews", {
        get: function () {
            return this.$store.getters['tagsView/visitedViews'];
        },
        enumerable: true,
        configurable: true
    });
    tagViews.prototype.generateRoute = function () {
        if (this.$route.name) {
            return this.$route;
        }
        return false;
    };
    tagViews.prototype.isActive = function (route) {
        // return route.path === this.$route.path || route.name === this.$route.name
        return route.path === this.$route.path;
    };
    tagViews.prototype.addViewTags = function () {
        var route = this.generateRoute();
        if (!route) {
            return false;
        }
        this.$store.dispatch('tagsView/addVisitedViews', route);
    };
    tagViews.prototype.moveToCurrentTag = function () {
        var _this = this;
        var tags = this.$refs.tag;
        this.$nextTick(function () {
            for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                var tag = tags_1[_i];
                if (tag.to === _this.$route.path) {
                    _this.$refs.scrollPane.moveToTarget(tag.$el);
                    break;
                }
            }
        });
    };
    tagViews.prototype.closeSelectedTag = function (view) {
        var _this = this;
        this.$store.dispatch('tagsView/delVisitedViews', view).then(function (views) {
            if (_this.isActive(view)) {
                var latestView = views.slice(-1)[0];
                if (latestView) {
                    _this.$router.push(latestView.path);
                }
                else {
                    _this.$router.push('/');
                }
            }
        });
    };
    tagViews.prototype.closeOthersTags = function () {
        var _this = this;
        this.$router.push(this.selectedTag.path);
        this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(function () {
            _this.moveToCurrentTag();
        });
    };
    tagViews.prototype.closeAllTags = function () {
        this.$store.dispatch('tagsView/delAllViews');
        this.$router.push('/');
    };
    tagViews.prototype.openMenu = function (tag, e) {
        this.visible = true;
        this.selectedTag = tag;
        this.left = e.clientX;
        this.top = e.clientY;
    };
    tagViews.prototype.closeMenu = function () {
        this.visible = false;
    };
    tagViews.prototype.routeChange = function (val, oldVal) {
        this.addViewTags();
        this.moveToCurrentTag();
    };
    tagViews.prototype.visibleChange = function (val, oldVal) {
        if (val) {
            window.addEventListener('click', this.closeMenu);
        }
        else {
            window.removeEventListener('click', this.closeMenu);
        }
    };
    return tagViews;
}(vue_1["default"]));
tslib_1.__decorate([
    vue_property_decorator_1.Watch('$route')
], tagViews.prototype, "routeChange");
tslib_1.__decorate([
    vue_property_decorator_1.Watch('visible')
], tagViews.prototype, "visibleChange");
tagViews = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'tagViews',
        mixins: [tagViews_vue_1["default"]],
        components: {
            ScrollPane: ScrollPane_1["default"]
        }
    })
], tagViews);
exports["default"] = tagViews;
//# sourceMappingURL=tagViews.js.map