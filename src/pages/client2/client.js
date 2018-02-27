"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var client_vue_1 = require("./client.vue");
var clone = require('clone');
var client = (function (_super) {
    tslib_1.__extends(client, _super);
    function client() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addShow = false;
        _this.clientVisible = false;
        //高级搜索
        _this.isShowSenior = false; // 高级搜索是否显示
        //次席系统字典和次席系统状态字典
        _this.SecondSeatSystemDict = [];
        _this.SecondSeatStatusDict = [];
        //新增表单
        _this.clientForm = {
            ClientNo: '',
            DoubleOpen: '',
            CommodityOption: '',
            FinancialOption: '',
            BankingfuturesWholesale: '',
            SecondSeats: [{
                    SecondSeatSystem: '',
                    SecondSeatStatus: '',
                    OpenTime: '',
                    CloseTime: ''
                }],
            Note: ''
        };
        //新增页面验证
        _this.clientRules = {
            ClientNo: [
                { required: true, message: '请输入六位数字的客户号', trigger: 'blur' },
                { min: 6, max: 6, message: '请输入六位数字的客户号', trigger: 'blur' }
            ],
            DoubleOpen: [{ required: true, message: '必选', trigger: 'blur' }]
        };
        return _this;
    }
    //次席信息管理表格数据
    client.prototype.data = function () {
        return {
            options: Object.assign({}, base_1["default"].prototype.$xvuex.options, {
                url: base_1["default"].prototype.$baseUrl.imss + 'Client',
                delUrl: base_1["default"].prototype.$baseUrl.imss + 'Client/IMSS.DeleteClient',
                addUrl: base_1["default"].prototype.$baseUrl.imss + 'Client/IMSS.CreateClient',
                editUrl: base_1["default"].prototype.$baseUrl.imss + 'Client/IMSS.UpdateClient',
                urlParameter: {
                    $filter: '',
                    $orderby: '',
                    $expand: ''
                },
                dicUrls: {
                    SecondSeatSystemDict: base_1["default"].prototype.$baseUrl.imss + "DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary",
                    SecondSeatStatusDict: base_1["default"].prototype.$baseUrl.imss + "DataDictionaryType?$filter=(Code eq 'TSSS')&$expand=DataDictionary"
                },
                title: '次席系统',
                gridKey: 'client',
                isSelection: true,
                pager_size_opts: [30, 50, 100],
                pager_Size: 30,
                table: [
                    {
                        key: 'Id',
                        title: 'ID',
                        addLayer: 'hide',
                        editLayer: 'hide',
                        searchKey: 'hide',
                        column: 'hide',
                        width: 'auto',
                        type: 'number' // 默认 string  ，种类：string  number select remoteMethod
                    },
                    {
                        key: 'ClientNo',
                        title: '客户号',
                        fixed: 'left',
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'TotalSecondSeatStatus',
                        title: '总次席状态',
                        dicKey: 'SecondSeatStatusDict',
                        type: 'select',
                        filter: true,
                        filters: [],
                        searchKey: 'hide',
                        readOnly: true,
                        fixed: 'left'
                    },
                    {
                        key: 'SecondSeatSystem',
                        title: '次席系统',
                        dicKey: 'SecondSeatSystemDict',
                        width: 120,
                        type: 'select',
                        filter: true,
                        filters: [],
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'SecondSeatStatus',
                        title: '次席系统状态',
                        dicKey: 'SecondSeatStatusDict',
                        type: 'select',
                        filter: true,
                        filters: [],
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'MultiSecondSeat',
                        title: '多次席',
                        searchKey: 'hide',
                        type: 'select',
                        selects: [{ value: true, text: '是' }, { value: false, text: '否' }],
                        readOnly: true
                    },
                    {
                        key: 'DoubleOpen',
                        title: '双开客户',
                        searchKey: 'hide',
                        selects: [{ value: true, text: '是' }, { value: false, text: '否' }],
                        type: 'select',
                        filter: true,
                        filters: [{ value: "(DoubleOpen eq true)", text: '是' }, { value: "(DoubleOpen eq false)", text: '否' }],
                        rules: [{ required: true, message: '必填' }]
                    },
                    {
                        key: 'BankingfuturesWholesale',
                        title: '银期大额',
                        type: 'number'
                    },
                    {
                        key: 'CommodityOption',
                        title: '商品期权',
                        dicKey: 'SPQQDict',
                        searchKey: 'show',
                        selects: [{ value: true, text: '正常' }, { value: false, text: ' ' }],
                        filter: true,
                        filters: [{ value: "(CommodityOption eq true)", text: '正常' }, { value: "(CommodityOption eq false)", text: '' }],
                        type: 'select'
                    },
                    {
                        key: 'FinancialOption',
                        title: '金融期权',
                        dicKey: 'JRQQDict',
                        searchKey: 'show',
                        selects: [{ value: true, text: '正常' }, { value: false, text: ' ' }],
                        filter: true,
                        filters: [{ value: "(FinancialOption eq true)", text: '正常' }, { value: "(FinancialOption eq false)", text: '' }],
                        type: 'select'
                    },
                    {
                        key: 'OpenTime',
                        title: '开通日期',
                        searchKey: 'hide',
                        column: 'hide',
                        type: 'date'
                    },
                    {
                        key: 'CloseTime',
                        title: '关闭日期',
                        searchKey: 'hide',
                        column: 'hide',
                        type: 'date'
                    },
                    {
                        key: 'Note',
                        title: '备注',
                        searchKey: 'hide'
                    },
                    {
                        key: 'action',
                        title: '操作',
                        width: 160,
                        addLayer: 'hide',
                        editLayer: 'hide',
                        searchKey: 'hide',
                        fixed: 'right',
                        render: [
                            {
                                fn: this.editRow,
                                type: 'primary',
                                tag: 'button',
                                text: '编辑'
                            },
                            {
                                fn: this.deleteRow,
                                tag: 'button',
                                type: 'danger',
                                text: '删除'
                            }
                        ]
                    }
                ]
            })
        };
    };
    /**
     *  设置筛选项内容
     */
    client.prototype.setFilters = function () {
        var _this = this;
        var table = clone(this.getState.table);
        table.forEach(function (item) {
            if (item.filter === true && _this.$store.state[item.dicKey]) {
                var filters_1 = [];
                var selects_1 = [];
                var dicData = _this.$store.state[item.dicKey].data.value;
                if (dicData.length > 0) {
                    dicData[0].DataDictionary.forEach(function (dicItem) {
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
        });
        _this.$store.dispatch(_this.options.gridKey + 'setData', { table: table });
    };
    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    client.prototype.setTableData = function (tableData) {
        var initData = clone(tableData);
        var SecondSeatSystemDict = '';
        var SecondSeatStatusDict = '';
        if (this.$store.state.SecondSeatSystemDict.data) {
            SecondSeatSystemDict = this.$store.state.SecondSeatSystemDict.data.value;
        }
        if (this.$store.state.SecondSeatStatusDict.data) {
            SecondSeatStatusDict = this.$store.state.SecondSeatStatusDict.data.value;
        }
        initData.forEach(function (item) {
            //设置总次席系统状态
            if (SecondSeatStatusDict.length > 0) {
                SecondSeatStatusDict[0].DataDictionary.forEach(function (dicItem) {
                    if (dicItem.Id === item.TotalSecondSeatStatus) {
                        item.TotalSecondSeatStatus = dicItem.Name;
                    }
                });
            }
            //设置次席系统
            if (SecondSeatSystemDict.length > 0) {
                SecondSeatSystemDict[0].DataDictionary.forEach(function (dicItem) {
                    if (dicItem.Id === item.SecondSeatSystem) {
                        item.SecondSeatSystem = dicItem.Name;
                    }
                });
            }
            //设置次席系统状态
            if (SecondSeatStatusDict.length > 0) {
                SecondSeatStatusDict[0].DataDictionary.forEach(function (dicItem) {
                    if (dicItem.Id === item.SecondSeatStatus) {
                        item.SecondSeatStatus = dicItem.Name;
                    }
                });
            }
            item.MultiSecondSeat = item.MultiSecondSeat == true ? '是' : '否';
            item.DoubleOpen = item.DoubleOpen == true ? '是' : '否';
            item.CommodityOption = item.CommodityOption == true ? '正常' : '';
            item.FinancialOption = item.FinancialOption == true ? '正常' : '';
            item.OpenTime = (item.OpenTime != null ? item.OpenTime.split('T')[0] : null);
            item.CloseTime = (item.CloseTime != null ? item.CloseTime.split('T')[0] : null);
        });
        this.$store.dispatch(this.options.gridKey + 'setData', { tableData: initData });
    };
    client.prototype.editRow = function (scope) {
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
    client.prototype.deleteRow = function (scope) {
        var _this = this;
        this.$confirm('此操作将删除该项, 是否继续?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function () {
            var id = scope.row.Id;
            var params = { Id: id };
            var url = _this.getState.delUrl;
            var requestDataHeader = base_1["default"].prototype.$api.request(url, { method: 'POST', body: JSON.stringify(params) });
            fetch(requestDataHeader).then(function (resp) {
                if (resp.ok === true) {
                    _this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                    _this.$store.dispatch(_this.options.gridKey + '_set_refresh');
                }
                else {
                    return resp.json();
                }
            }).then(function (data) {
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // })
            });
        })["catch"](function () {
        });
    };
    client.prototype.headerFn = function () {
        return {
            batchDel: function () {
                var _this = this;
                var delObjs = _this.getState.selection;
                var $length = delObjs.length;
                if ($length === 0) {
                    this.$message({
                        message: '请先选中需要删除的项目。',
                        type: 'warning'
                    });
                    return false;
                }
                this.$confirm('此操作将删除选中项, 是否继续?', '批量删除确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    var myRequests = [];
                    delObjs.forEach(function (item) {
                        var url = "" + _this.getState.delUrl;
                        var params = { Id: item.Id };
                        console.log(item.Id);
                        myRequests.push(base_1["default"].prototype.$api.request(url, { method: 'POST', body: JSON.stringify(params) }));
                    });
                    Promise.all(myRequests.map(function (myRequest) {
                        return fetch(myRequest).then(function (resp) {
                            if (resp.ok === true) {
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                _this.$store.dispatch(_this.options.gridKey + '_set_refresh');
                                //删除最后一页 bug
                                var pagerCurrentPage = _this.getState.pager_CurrentPage;
                                var pageSize = _this.getState.pager_Size;
                                var pagerTotal = _this.getState.pager_Total;
                                if (pagerCurrentPage > 1 && pagerTotal % pageSize === $length) {
                                    _this.$store.dispatch(_this.getState.gridKey + 'setData', { pager_CurrentPage: pagerCurrentPage - 1 });
                                }
                                _this.$store.dispatch(_this.getState.gridKey + 'setData', { selection: [] });
                            }
                            else {
                                isRequestOk = resp.ok;
                                return resp.json();
                            }
                        });
                    }));
                })["catch"](function () {
                });
            }
        };
    };
    client.prototype.tableFn = function () {
        return {};
    };
    client.prototype.addFn = function () {
        return {};
    };
    client.prototype.editFn = function () {
        return {
            handleSubmit: function (formName) {
                var _this = this;
                var _this = this;
                this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        for (var item in _this.dataMsg) {
                            if (typeof _this.dataMsg[item] === 'string') {
                                _this.dataMsg[item] = _this.dataMsg[item].replace(/(^\s*)|(\s*$)/g, '');
                            }
                            else {
                                _this.dataMsg[item] = _this.dataMsg[item];
                            }
                        } // 去除空格
                        var data = {
                            "dto": {
                                "Id": _this.dataMsg.Id,
                                "SecondSeatSystem": _this.dataMsg.SecondSeatSystem,
                                "SecondSeatStatus": _this.dataMsg.SecondSeatStatus,
                                "DoubleOpen": _this.dataMsg.DoubleOpen,
                                "CommodityOption": _this.dataMsg.CommodityOption,
                                "FinancialOption": _this.dataMsg.FinancialOption,
                                "OpenTime": _this.dataMsg.OpenTime,
                                "CloseTime": _this.dataMsg.CloseTime,
                                "Note": _this.dataMsg.Note
                            }
                        };
                        var url = "" + _this.getState.editUrl;
                        var requestDataHeader = base_1["default"].prototype.$api.request(url, {
                            method: 'POST',
                            body: JSON.stringify(data)
                        });
                        var isRequestOk_1;
                        fetch(requestDataHeader).then(function (resp) {
                            if (resp.ok === true) {
                                _this.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success'
                                });
                                _this.$store.dispatch(_this.options.gridKey + '_set_refresh');
                                _this.show = false; // 关闭弹窗
                            }
                            else {
                                isRequestOk_1 = resp.ok;
                                return resp.json();
                            }
                        }).then(function (data) {
                            if (isRequestOk_1 === false) {
                                _this.$notify.error({
                                    title: '错误消息',
                                    message: data.message
                                });
                                return false;
                            }
                        });
                    }
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        };
    };
    Object.defineProperty(client.prototype, "getState", {
        get: function () {
            return this.$store.state[this.options.gridKey];
        },
        enumerable: true,
        configurable: true
    });
    client.prototype.handleClose = function (done) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.dialogVisible = false;
                return [2 /*return*/];
            });
        });
    };
    //删除次席
    client.prototype.removeSecondSeats = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var index;
            return tslib_1.__generator(this, function (_a) {
                index = this.clientForm.SecondSeats.indexOf(item);
                if (index !== -1) {
                    this.clientForm.SecondSeats.splice(index, 1);
                }
                return [2 /*return*/];
            });
        });
    };
    //添加次席
    client.prototype.addSecondSeats = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.clientForm.SecondSeats.push({
                    value: '',
                    key: Date.now()
                });
                return [2 /*return*/];
            });
        });
    };
    //展示新增Model
    client.prototype.showClientModel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.clientVisible = true;
                this.clientForm = {
                    ClientNo: '',
                    DoubleOpen: '',
                    CommodityOption: '',
                    FinancialOption: '',
                    BankingfuturesWholesale: null,
                    SecondSeats: [{
                            SecondSeatSystem: '',
                            SecondSeatStatus: '',
                            OpenTime: '',
                            CloseTime: ''
                        }],
                    Note: ''
                };
                if (this.$store.state.SecondSeatSystemDict.data.value.length > 0) {
                    this.SecondSeatSystemDict = this.$store.state.SecondSeatSystemDict.data.value[0].DataDictionary;
                }
                if (this.$store.state.SecondSeatStatusDict.data.value.length > 0) {
                    this.SecondSeatStatusDict = this.$store.state.SecondSeatStatusDict.data.value[0].DataDictionary;
                }
                return [2 /*return*/];
            });
        });
    };
    client.prototype.detailClose = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.clientVisible = false;
                return [2 /*return*/];
            });
        });
    };
    //新增-保存次席信息
    client.prototype.handleSubmit = function (formName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _self, clientForm, secondSeatsItems;
            return tslib_1.__generator(this, function (_a) {
                _self = this;
                clientForm = _self.clientForm;
                secondSeatsItems = _self.clientForm.SecondSeats;
                secondSeatsItems.forEach(function (item) {
                    var dto = {
                        dto: {
                            ClientNo: clientForm.ClientNo,
                            SecondSeatSystem: item.SecondSeatSystem,
                            SecondSeatStatus: item.SecondSeatStatus,
                            DoubleOpen: clientForm.DoubleOpen == '是' ? true : false,
                            BankingfuturesWholesale: Number(clientForm.BankingfuturesWholesale),
                            CommodityOption: clientForm.CommodityOption ? clientForm.CommodityOption : false,
                            FinancialOption: clientForm.FinancialOption ? clientForm.FinancialOption : false,
                            OpenTime: (item.OpenTime ? item.OpenTime : null),
                            CloseTime: (item.CloseTime ? item.CloseTime : null),
                            Note: clientForm.Note
                        }
                    };
                    //client.dto.SecondSeatSystem = item.SecondSeatSystem
                    //client.dto.SecondSeatStatus=item.SecondSeatStatus
                    //client.dto.OpenTime= (item.OpenTime ? item.OpenTime : null)
                    //client.dto.CloseTime= (item.CloseTime ? item.CloseTime : null)
                    //console.log(client)
                    _self.$refs[formName].validate(function (valid) {
                        if (valid) {
                            var url = _self.getState.addUrl;
                            var requestDataHeader = base_1["default"].prototype.$api.request(url, { method: 'POST', body: JSON.stringify(dto) });
                            fetch(requestDataHeader).then(function (resp) {
                                if (resp.ok === true) {
                                    _self.clientVisible = false;
                                    _self.$message({
                                        showClose: true,
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    _self.$store.dispatch(_self.options.gridKey + '_set_refresh');
                                    _self.show = false; // 关闭弹窗
                                }
                                else {
                                    return resp.json();
                                }
                            }).then(function (data) {
                            });
                        }
                        else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    //出金
    client.prototype.setMoney = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, clientArr, selectArr, setMoney;
            return tslib_1.__generator(this, function (_a) {
                client = {
                    ClientNo: null,
                    BankingfuturesWholesale: null
                };
                clientArr = [];
                selectArr = this.getState.selection;
                selectArr.forEach(function (item) {
                    var flag = false;
                    for (var i = 0; i < clientArr.length; i++) {
                        if (item.ClientNo === clientArr[i].ClientNo) {
                            flag = true;
                        }
                    }
                    if (!flag && item.DoubleOpen == '否' && item.TotalSecondSeatStatus == '正常') {
                        client = {
                            ClientNo: item.ClientNo,
                            BankingfuturesWholesale: item.BankingfuturesWholesale
                        };
                        clientArr.push(client);
                    }
                });
                setMoney = {
                    Clients: clientArr,
                    Type: 1
                };
                localStorage.setItem('setMoney', JSON.stringify(setMoney));
                this.$router.push({ path: '/setMoney/setMoney/ClientArr', query: { Name: '出金' } });
                return [2 /*return*/];
            });
        });
    };
    //恢复
    client.prototype.recover = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, clientArr, selectArr, setMoney;
            return tslib_1.__generator(this, function (_a) {
                client = {
                    ClientNo: null,
                    BankingfuturesWholesale: null
                };
                clientArr = [];
                selectArr = this.getState.selection;
                //console.log(selectArr)
                selectArr.forEach(function (item) {
                    var flag = false;
                    for (var i = 0; i < clientArr.length; i++) {
                        if (item.ClientNo === clientArr[i].ClientNo) {
                            flag = true;
                        }
                    }
                    if (!flag && item.DoubleOpen == '否' && item.TotalSecondSeatStatus == '正常') {
                        client = {
                            ClientNo: item.ClientNo,
                            BankingfuturesWholesale: item.BankingfuturesWholesale
                        };
                        clientArr.push(client);
                    }
                });
                setMoney = {
                    Clients: clientArr,
                    Type: 2
                };
                localStorage.setItem('setMoney', JSON.stringify(setMoney));
                this.$router.push({ path: '/setMoney/setMoney/ClientArr', query: { Name: '恢复' } });
                return [2 /*return*/];
            });
        });
    };
    return client;
}(base_1["default"]));
client = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'client',
        mixins: [client_vue_1["default"]],
        watch: {
            'getState.initTableData': {
                handler: function (val, oldVal) {
                    if (oldVal !== undefined) {
                        this.setFilters();
                        this.setTableData(val);
                    }
                },
                deep: true
            }
        },
        mounted: function () {
            //console.log(Vue.prototype)
        }
    })
], client);
exports["default"] = client;
//# sourceMappingURL=client.js.map