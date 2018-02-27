"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var vue_1 = require("vue");
var vue_property_decorator_1 = require("vue-property-decorator");
var layer_vue_1 = require("./layer.vue");
var changeHistory_service_1 = require("../../../api-service/changeHistory.service");
var clone = require('clone');
var Layer = (function (_super) {
    tslib_1.__extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show = false;
        _this.beforeData = [{ ClientNo: null, Note: null }]; // 页面初始
        _this.afterData = [{ ClientNo: null, Note: null }];
        return _this;
    }
    Layer.prototype.setVisible = function () {
        this.$store.dispatch('common/setcommon', { layerShow: false });
    };
    Layer.prototype.getbeforeData = function (ClientNo, time) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, changeHistory_service_1.getbeforeData(ClientNo, time)];
                    case 1:
                        data = _a.sent();
                        if (data.value.length === 0) {
                            this.beforeData = [];
                        }
                        else {
                            this.beforeData = [this.changeVal(data.value[0])];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Layer.prototype.changeVal = function (obj) {
        try {
            obj.CloseTime = obj.CloseTime.split('T')[0];
            obj.OpenTime = obj.OpenTime.split('T')[0];
        }
        catch (e) {
        }
        obj.DoubleOpen = obj.DoubleOpen === true ? '是' : '否';
        obj.CommodityOption = obj.CommodityOption === true ? '开' : '关';
        obj.FinancialOption = obj.FinancialOption === true ? '开' : '关';
        var ss = this.getState.SS.data.value[0].DataDictionary;
        ss.forEach(function (item) {
            if (item.Id === obj.SecondSeatSystem) {
                obj.SecondSeatSystem = item.Name;
            }
        });
        var sss = this.getState.SSS.data.value[0].DataDictionary;
        sss.forEach(function (item) {
            if (item.Id === obj.SecondSeatStatus) {
                obj.SecondSeatStatus = item.Name;
            }
        });
        return obj;
    };
    Object.defineProperty(Layer.prototype, "getCommon", {
        get: function () {
            return this.$store.state.common;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "getState", {
        get: function () {
            return this.$store.state;
        },
        enumerable: true,
        configurable: true
    });
    return Layer;
}(vue_1["default"]));
Layer = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'layer',
        mixins: [layer_vue_1["default"]],
        watch: {
            'getCommon.layerShow': {
                handler: function (val, oldVal) {
                    this.show = val;
                    if (val === true) {
                        var copyData = clone(this.getCommon.userMsg);
                        var afterData = this.changeVal(copyData);
                        this.afterData = [afterData];
                        var ClientNo = afterData.ClientNo;
                        var CreationTime = afterData.copyCreationTime;
                        var time = vue_1["default"].prototype.$api.changeTime(CreationTime);
                        this.getbeforeData(ClientNo, time);
                    }
                },
                deep: false
            }
        },
        mounted: function () {
        }
    })
], Layer);
exports["default"] = Layer;
//# sourceMappingURL=layer.js.map