"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var synStream_vue_1 = require("./synStream.vue");
var clone = require('clone');
var synStream = (function (_super) {
    tslib_1.__extends(synStream, _super);
    function synStream() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formInline = {
            userId: null
        };
        _this.isToday = false;
        _this.addShow = false;
        _this.delShow = false;
        _this.detailVisible = true;
        _this.modelVisible = false;
        _this.clientWithdrawForm = {
            ClientNo: ''
        };
        return _this;
    }
    synStream.prototype.data = function () {
        return {
            options: Object.assign({}, base_1["default"].prototype.$xvuex.options, {
                url: base_1["default"].prototype.$baseUrl.imss + 'SyncLogStatistic',
                delUrl: base_1["default"].prototype.$baseUrl.imss + 'SyncLogStatistic',
                addUrl: base_1["default"].prototype.$baseUrl.imss + 'SyncLogStatistic',
                editUrl: base_1["default"].prototype.$baseUrl.imss + 'SyncLogStatistic',
                urlParameter: {
                    $filter: '',
                    $orderby: '',
                    $expand: ''
                },
                dicUrls: {},
                title: '操作同步流水',
                gridKey: 'Clientwithdraw',
                isSelection: true,
                pager_size_opts: [30, 50, 100],
                pager_Size: 30,
                table: [
                    {
                        key: 'Id',
                        title: 'ID',
                        addLayer: 'show',
                        editLayer: 'show',
                        searchKey: 'hide',
                        column: 'hide',
                        width: 'auto',
                        type: 'number' // 默认 string  ，种类：string  number select remoteMethod
                    },
                    {
                        key: 'SerialNo',
                        title: '流水号',
                        render: [
                            {
                                "class": 'pointer',
                                text: '点击查看流水详情',
                                fn: this.showModel
                            }
                        ]
                    },
                    {
                        key: 'SyncType',
                        title: '操作类型',
                        searchKey: 'hide',
                        type: 'select',
                        filter: true,
                        filters: [{ value: "(SyncType eq IMSS.SyncLogs.SyncTypeEnum'Restore')", text: '设置出金参数' }, { value: "(SyncType eq IMSS.SyncLogs.SyncTypeEnum'Withdraw')", text: '设置恢复参数' }],
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'ClientCount',
                        title: '设置客户数',
                        searchKey: 'hide',
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'CreationTime',
                        title: '修改时间',
                        type: 'date',
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'CreatorUserId',
                        title: '操作人',
                        width: 160,
                        addLayer: 'hide',
                        editLayer: 'hide'
                    }
                ]
            }),
            detailOptions: Object.assign({}, base_1["default"].prototype.$xvuex.options, {
                url: base_1["default"].prototype.$baseUrl.imss + 'SyncLog',
                urlParameter: {
                    $filter: '',
                    $orderby: 'ClientNo',
                    $expand: ''
                },
                dicUrls: {
                    ChiefStatusDict: base_1["default"].prototype.$baseUrl.imss + "DataDictionaryType?$filter=(Code eq 'CSS')&$expand=DataDictionary"
                },
                title: '操作同步流水详细',
                gridKey: 'ClientwithdrawDetail',
                isSelection: true,
                pager_size_opts: [30, 50, 100],
                pager_Size: 30,
                table: [
                    {
                        key: 'Id',
                        title: 'ID',
                        addLayer: 'show',
                        editLayer: 'show',
                        searchKey: 'hide',
                        column: 'hide',
                        width: 'auto',
                        type: 'number' // 默认 string  ，种类：string  number select remoteMethod
                    },
                    {
                        key: 'ClientNo',
                        title: '客户号'
                    },
                    {
                        key: 'ChiefStatus',
                        title: '主席状态',
                        searchKey: 'hide',
                        dicKey: 'ChiefStatusDict',
                        type: 'select',
                        filter: true,
                        filters: [],
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'MaxWithdraw',
                        title: '最大出金限额',
                        searchKey: 'hide',
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'UnitLimit',
                        title: '出金单笔限额',
                        type: 'date',
                        rules: [{ required: true, message: '必填' }]
                    }
                ]
            })
        };
    };
    synStream.prototype.onSubmit = function () {
    };
    synStream.prototype.batchDel = function () { };
    /**
     *  设置筛选项内容
     */
    synStream.prototype.setFilters = function () {
        var _this = this;
        var table = clone(this.getState.table);
        _this.$store.dispatch(_this.options.gridKey + 'setData', { table: table });
    };
    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    synStream.prototype.setTableData = function (tableData) {
        var initData = clone(tableData);
        initData.forEach(function (item) {
            if (item.SyncType == 'Withdraw') {
                item.SyncType = '设置恢复参数';
            }
            else if (item.SyncType == 'Restore') {
                item.SyncType = '设置出金参数';
            }
        });
        this.$store.dispatch(this.options.gridKey + 'setData', { tableData: initData });
    };
    /**
     *  设置筛选项内容
     */
    synStream.prototype.setDetailFilters = function () {
        var _this = this;
        var table = clone(this.getDetailState.table);
        table.forEach(function (item) {
            if (item.filter === true && _this.$store.state[item.dicKey]) {
                console.log(item.dicKey);
                var filters_1 = [];
                var selects_1 = [];
                var dicData = _this.$store.state[item.dicKey].data.value;
                if (item.dicKey == 'ChiefStatusDict') {
                    if (dicData.length > 0) {
                        dicData[0].DataDictionary.forEach(function (dicItem) {
                            console.log(dicItem.Name);
                            //筛选
                            var filterItem = {};
                            filterItem.text = dicItem.Name;
                            filterItem.value = "(" + item.key + " eq " + dicItem.Code + ")";
                            filters_1.push(filterItem);
                            //修改新增
                            var selectItem = {};
                            selectItem.text = dicItem.Name;
                            selectItem.value = dicItem.Code;
                            selects_1.push(selectItem);
                        });
                        item['filters'] = filters_1;
                        item['selects'] = selects_1;
                    }
                }
                else {
                    if (dicData.length > 0) {
                        dicData[0].DataDictionary.forEach(function (dicItem) {
                            console.log(dicItem.Name);
                            //筛选
                            var filterItem = {};
                            filterItem.text = dicItem.Name;
                            filterItem.value = "(" + item.key + " eq " + dicItem.Id + ")";
                            filters_1.push(filterItem);
                            //修改新增
                            var selectItem = {};
                            selectItem.text = dicItem.Name;
                            selectItem.value = dicItem.Id;
                            selects_1.push(selectItem);
                        });
                        item['filters'] = filters_1;
                        item['selects'] = selects_1;
                    }
                }
            }
        });
        _this.$store.dispatch(_this.detailOptions.gridKey + 'setData', { table: table });
    };
    /**
     * 详细
     * @param tableData 表格数据
     */
    synStream.prototype.setDetailTableData = function (tableData) {
        var initData = clone(tableData);
        initData.forEach(function (item) {
            if (item.ChiefStatus == 1) {
                item.ChiefStatus = '正常';
            }
            else if (item.ChiefStatus == 4) {
                item.ChiefStatus = '只可平仓';
            }
            else if (item.ChiefStatus == 5) {
                item.ChiefStatus = '禁取';
            }
            else if (item.ChiefStatus == 6) {
                item.ChiefStatus = '冻结';
            }
        });
        this.$store.dispatch(this.detailOptions.gridKey + 'setData', { tableData: initData });
    };
    synStream.prototype.editRow = function (scope) {
        var _this = this;
        var data = scope.row;
        if (data) {
            this.getState.initTableData.forEach(function (item) {
                if (item.Id === data.Id) {
                    _this.$store.dispatch(_this.options.gridKey + '_edit_Window_Visible', item);
                }
            });
        }
    };
    synStream.prototype.deleteRow = function (scope) {
        var _this = this;
        this.$confirm('此操作将删除该项, 是否继续?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function () {
            var id = scope.row.Id;
            var url = base_1["default"].prototype.$baseUrl.imss + "/ClientWithdraw(" + id + ")";
            var requestDataHeader = base_1["default"].prototype.$api.request(url, {
                method: 'DELETE'
            });
            fetch(requestDataHeader).then(function (resp) {
                return resp.json();
            }).then(function (data) {
                _this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            });
        })["catch"](function () {
        });
    };
    synStream.prototype.headerFn = function () {
        return {};
    };
    synStream.prototype.tableFn = function () {
        return {};
    };
    synStream.prototype.addFn = function () {
        return {};
    };
    synStream.prototype.editFn = function () {
        return {};
    };
    Object.defineProperty(synStream.prototype, "getState", {
        get: function () {
            return this.$store.state[this.options.gridKey];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(synStream.prototype, "getDetailState", {
        get: function () {
            return this.$store.state[this.detailOptions.gridKey];
        },
        enumerable: true,
        configurable: true
    });
    synStream.prototype.modelClose = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.modelVisible = false;
                this.detailVisible = false;
                return [2 /*return*/];
            });
        });
    };
    synStream.prototype.showModel = function (scope) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                this.modelVisible = true;
                this.detailVisible = true;
                data = scope.row;
                //let url = `${Vue.prototype.$baseUrl.imss}SyncLog?$filter=(SerialNo eq '${data.SerialNo}')`
                this.$store.dispatch(this.detailOptions.gridKey + 'setData', { urlParameter: {
                        $filter: "SerialNo eq '" + data.SerialNo + "'"
                    } });
                return [2 /*return*/];
            });
        });
    };
    return synStream;
}(base_1["default"]));
synStream = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'synStream',
        mixins: [synStream_vue_1["default"]],
        watch: {
            'getState.initTableData': {
                handler: function (val, oldVal) {
                    if (oldVal !== undefined) {
                        this.setFilters();
                        this.setTableData(val);
                    }
                },
                deep: true
            },
            'getDetailState.initTableData': {
                handler: function (val, oldVal) {
                    if (oldVal !== undefined) {
                        this.setDetailFilters();
                        this.setDetailTableData(val);
                    }
                },
                deep: true
            }
        },
        beforeMount: function () {
            this.$xvuex.registerModule(this, this.detailOptions, this.detailOptions.gridKey);
        },
        mounted: function () {
            //console.log(Vue.prototype)
        }
    })
], synStream);
exports["default"] = synStream;
//# sourceMappingURL=synStream.js.map