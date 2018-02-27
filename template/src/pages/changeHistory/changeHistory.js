"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var vue_1 = require("vue");
var vue_property_decorator_1 = require("vue-property-decorator");
var changeHistory_vue_1 = require("./changeHistory.vue");
var layer_1 = require("./layer");
var clone = require('clone');
var Dictionaries = (function (_super) {
    tslib_1.__extends(Dictionaries, _super);
    function Dictionaries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formInline = {
            userId: ''
        };
        _this.options = Object.assign({}, vue_1["default"].prototype.$xvuex.options, {
            url: vue_1["default"].prototype.$baseUrl.imss + 'ClientChangeLog',
            delUrl: vue_1["default"].prototype.$baseUrl.imss + 'ClientChangeLog',
            addUrl: vue_1["default"].prototype.$baseUrl.imss + 'ClientChangeLog',
            editUrl: vue_1["default"].prototype.$baseUrl.imss + 'ClientChangeLog',
            urlParameter: {
                $filter: '',
                $orderby: '',
                $expand: ''
            },
            dicUrls: {
                SS: vue_1["default"].prototype.$baseUrl.imss + "DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary",
                SSS: vue_1["default"].prototype.$baseUrl.imss + "DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary" // 次席状态
            },
            title: '次席变更记录',
            gridKey: 'ClientChangeLog',
            isSelection: true,
            table: [
                {
                    key: 'Id',
                    title: 'ID',
                    addLayer: 'show',
                    editLayer: 'show',
                    searchKey: 'show',
                    column: 'hide',
                    width: 'auto',
                    type: 'number' // 默认 string  ，种类：string  number select remoteMethod
                },
                {
                    key: 'ClientNo',
                    title: '客户号',
                    render: [
                        {
                            fn: _this.showDetails,
                            title: '点击查看详情' // 鼠标移到上面展示的内容
                        }
                    ],
                    width: 180
                },
                {
                    key: 'Note',
                    title: '变更说明',
                    rules: [{ required: true, message: '必填' }]
                },
                {
                    key: 'CreationTime',
                    title: '日期',
                    sortable: true,
                    width: 220,
                    type: 'date',
                    rules: [{ required: true, message: '必填' }]
                },
                {
                    key: 'copyCreationTime',
                    title: '复制日期搜索用',
                    sortable: true,
                    width: 220,
                    addLayer: 'show',
                    editLayer: 'show',
                    searchKey: 'show',
                    column: 'hide',
                    type: 'date',
                    rules: [{ required: true, message: '必填' }]
                },
                {
                    key: 'CreatorUserId',
                    title: '操作人',
                    width: 220,
                    addLayer: 'hide',
                    editLayer: 'hide' // 新增页面 是否显示：不显示写，显示可不写或其他值
                }
            ]
        });
        return _this;
    }
    // layer
    Dictionaries.prototype.showDetails = function (item) {
        this.$store.dispatch('common/setcommon', { layerShow: true });
        this.$store.dispatch('common/setcommon', { userMsg: item.row });
    };
    Dictionaries.prototype.refreshFn = function () {
        this.$store.dispatch(this.options.gridKey + '_set_refresh');
    };
    Dictionaries.prototype.onSubmit = function () {
        var userId = this.formInline.userId;
        if (userId === '') {
            return false;
        }
        var url = vue_1["default"].prototype.$baseUrl.imss + "ClientChangeLog?$filter=contains(ClientNo,'" + userId + "')";
        this.$store.dispatch(this.options.gridKey + 'setData', { requestUrl: url });
    };
    /**
     *  设置筛选项内容
     */
    Dictionaries.prototype.setFilters = function () {
        var _this = this;
        var table = clone(this.getState.table);
        table.forEach(function (item) {
            if (item.filter === true) {
                var filters_1 = [];
                var selects_1 = [];
                var dicData = _this.$store.state[item.dicKey].data.value;
                dicData.forEach(function (dicItem) {
                    //            帅选
                    var filterItem = {};
                    filterItem.text = dicItem.Value;
                    filterItem.value = "(" + item.key + " eq '" + dicItem.Code + "')";
                    filters_1.push(filterItem);
                    //            修改新增
                    var selectItem = {};
                    selectItem.text = dicItem.Value;
                    selectItem.value = dicItem.Code;
                    selects_1.push(selectItem);
                });
                item['filters'] = filters_1;
                item['selects'] = selects_1;
            }
        });
        _this.$store.dispatch(_this.options.gridKey + 'setData', { table: table });
    };
    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    Dictionaries.prototype.setTableData = function (tableData) {
        var initData = clone(tableData);
        initData.forEach(function (item) {
            item.copyCreationTime = item.CreationTime;
            item.CreationTime = item.CreationTime.split('T')[0];
        });
        this.$store.dispatch(this.options.gridKey + 'setData', { tableData: initData });
    };
    Dictionaries.prototype.headerFn = function () {
        return {};
    };
    Dictionaries.prototype.tableFn = function () {
        return {};
    };
    Dictionaries.prototype.addFn = function () {
        return {};
    };
    Dictionaries.prototype.editFn = function () {
        return {};
    };
    Object.defineProperty(Dictionaries.prototype, "getState", {
        get: function () {
            return this.$store.state[this.options.gridKey];
        },
        enumerable: true,
        configurable: true
    });
    return Dictionaries;
}(vue_1["default"]));
Dictionaries = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'dictionaries',
        mixins: [changeHistory_vue_1["default"]],
        watch: {
            'getState.initTableData': {
                handler: function (val, oldVal) {
                    if (oldVal !== undefined) {
                        // this.setFilters()
                        this.setTableData(val);
                    }
                },
                deep: true
            }
        },
        components: {
            'layer': layer_1["default"]
        },
        mounted: function () {
            console.log(this);
        }
    })
], Dictionaries);
exports["default"] = Dictionaries;
//# sourceMappingURL=changeHistory.js.map