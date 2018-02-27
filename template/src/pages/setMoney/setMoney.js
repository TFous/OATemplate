"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/25.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var setMoney_vue_1 = require("./setMoney.vue");
var clone = require('clone');
var setMoney = (function (_super) {
    tslib_1.__extends(setMoney, _super);
    function setMoney() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formInline = {
            userId: null
        };
        _this.type = null;
        _this.tableData = [];
        _this.ChiefStatusDict = [];
        _this.title = '';
        _this.modelVisible = false;
        _this.clientModelVisible = false;
        _this.modelForm = {
            ClientNo: null,
            Status: null,
            MaxWithdraw: null,
            UnitLimit: null
        };
        return _this;
    }
    setMoney.prototype.modelClose = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.modelVisible = false;
                return [2 /*return*/];
            });
        });
    };
    //次席信息管理表格数据
    setMoney.prototype.data = function () {
        return {
            options: Object.assign({}, base_1["default"].prototype.$xvuex.options, {
                url: base_1["default"].prototype.$baseUrl.imss + 'Client',
                delUrl: base_1["default"].prototype.$baseUrl.imss + 'Client/IMSS.DeleteClient',
                addUrl: base_1["default"].prototype.$baseUrl.imss + 'Client/IMSS.CreateClient',
                editUrl: base_1["default"].prototype.$baseUrl.imss + 'Client/IMSS.UpdateClient',
                urlParameter: {
                    $filter: "((TotalSecondSeatStatus eq 10)and(DoubleOpen eq false))",
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
                    }
                ]
            })
        };
    };
    Object.defineProperty(setMoney.prototype, "setMoneyTableDatas", {
        /**
         *  设置筛选项内容
         */
        get: function () {
            return this.$store.getters['setMoney/tableData'];
        },
        enumerable: true,
        configurable: true
    });
    setMoney.prototype.setFilters = function () {
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
    setMoney.prototype.setTableData = function (tableData) {
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
    Object.defineProperty(setMoney.prototype, "getState", {
        get: function () {
            return this.$store.state[this.options.gridKey];
        },
        enumerable: true,
        configurable: true
    });
    setMoney.prototype.showClientModel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.clientModelVisible = true;
                return [2 /*return*/];
            });
        });
    };
    setMoney.prototype.clientModelClose = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.clientModelVisible = false;
                return [2 /*return*/];
            });
        });
    };
    setMoney.prototype.GetDicts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var params, _self, url, requestDataHeader;
            return tslib_1.__generator(this, function (_a) {
                params = this.$route.params.ClientNo;
                _self = this;
                url = base_1["default"].prototype.$baseUrl.imss + "DataDictionaryType?$filter=(Code eq 'CSS')&$expand=DataDictionary";
                requestDataHeader = base_1["default"].prototype.$api.request(url);
                fetch(requestDataHeader).then(function (resp) {
                    return resp.json();
                }).then(function (datas) {
                    if (datas.value.length > 0) {
                        _this.ChiefStatusDict = datas.value[0].DataDictionary;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    setMoney.prototype.addClients = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var selectArr, _self, tableData;
            return tslib_1.__generator(this, function (_a) {
                selectArr = this.getState.selection;
                _self = this;
                tableData = clone(this.setMoneyTableDatas);
                selectArr.forEach(function (selectClient) {
                    var flag = false;
                    tableData.forEach(function (item) {
                        if (item.ClientNo === selectClient.ClientNo) {
                            flag = true;
                        }
                    });
                    if (!flag) {
                        var status_1 = null;
                        _self.ChiefStatusDict.forEach(function (dict) {
                            if (dict.Name == '正常') {
                                status_1 = Number(dict.Code);
                            }
                        });
                        var client = {
                            ClientNo: selectClient.ClientNo,
                            StatusName: '正常',
                            Status: status_1,
                            MaxWithdraw: 1000000,
                            UnitLimit: 0,
                            BankingfuturesWholesale: selectClient.BankingfuturesWholesale
                        };
                        tableData.push(client);
                    }
                });
                this.tableData = tableData;
                this.clientModelVisible = false;
                this.$store.dispatch('setMoney/setTableData', tableData);
                return [2 /*return*/];
            });
        });
    };
    //移除客户
    setMoney.prototype.remove = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var i, tableData;
            return tslib_1.__generator(this, function (_a) {
                i = 0;
                tableData = clone(this.setMoneyTableDatas);
                tableData.forEach(function (dataItem) {
                    if (dataItem.ClientNo == item.ClientNo) {
                        tableData.splice(i, 1);
                    }
                    i++;
                });
                this.tableData = tableData;
                this.$store.dispatch('setMoney/setTableData', tableData);
                return [2 /*return*/];
            });
        });
    };
    //导入银期大额
    setMoney.prototype.exportBank = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.$confirm('确认导入银期大额?', '导入确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    var tableData = clone(_this.setMoneyTableDatas);
                    tableData.forEach(function (item) {
                        item.MaxWithdraw = item.BankingfuturesWholesale;
                    });
                    _this.tableData = tableData;
                    _this.$store.dispatch('setMoney/setTableData', tableData);
                });
                return [2 /*return*/];
            });
        });
    };
    setMoney.prototype.setMoneyTableData = function (setMoney) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var params, _self, url, requestDataHeader, dataArr, maxWithdraw, status;
            return tslib_1.__generator(this, function (_a) {
                params = this.$route.params.ClientNo;
                _self = this;
                url = base_1["default"].prototype.$baseUrl.imss + "DataDictionaryType?$filter=(Code eq 'CSS')&$expand=DataDictionary";
                requestDataHeader = base_1["default"].prototype.$api.request(url);
                fetch(requestDataHeader).then(function (resp) {
                    return resp.json();
                }).then(function (datas) {
                    if (datas.value.length > 0) {
                        _this.ChiefStatusDict = datas.value[0].DataDictionary;
                        console.log(_this.ChiefStatusDict);
                    }
                    //console.log(this.ChiefStatusDict)
                });
                if (setMoney && params == 'ClientArr') {
                    dataArr = [];
                    maxWithdraw = 0;
                    status = null;
                    if (setMoney.Type == 1) {
                        maxWithdraw = 1000000;
                        this.title = '出金参数设置';
                        this.type = 1;
                        this.ChiefStatusDict.forEach(function (dict) {
                            if (dict.Name = '正常') {
                                status = dict.Code;
                            }
                        });
                    }
                    else if (setMoney.Type == 2) {
                        maxWithdraw = 0;
                        this.title = '恢复参数设置';
                        this.type = 2;
                        this.ChiefStatusDict.forEach(function (dict) {
                            if (dict.Name = '只可平仓') {
                                status = dict.Code;
                            }
                        });
                    }
                    setMoney.Clients.forEach(function (client) {
                        var client = {
                            ClientNo: client.ClientNo,
                            Status: status,
                            MaxWithdraw: maxWithdraw,
                            UnitLimit: 0,
                            BankingfuturesWholesale: client.BankingfuturesWholesale
                        };
                        dataArr.push(client);
                    });
                    this.tableData = dataArr;
                    this.$store.dispatch();
                }
                return [2 /*return*/];
            });
        });
    };
    //添加客户
    setMoney.prototype.AddClient = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var maxWithdraw, userId, _self, flag, url, requestDataHeader;
            return tslib_1.__generator(this, function (_a) {
                maxWithdraw = 0;
                if (this.type == 1) {
                    maxWithdraw = 1000000;
                }
                else if (this.type == 2) {
                    maxWithdraw = 0;
                }
                userId = this.formInline.userId;
                _self = this;
                if (userId) {
                    flag = false;
                    this.tableData.forEach(function (client) {
                        if (client.ClientNo == userId) {
                            flag = true;
                        }
                    });
                    if (!flag) {
                        url = base_1["default"].prototype.$baseUrl.imss + ("Client/$count?$filter=(ClientNo eq '" + userId + "')");
                        requestDataHeader = base_1["default"].prototype.$api.request(url);
                        fetch(requestDataHeader).then(function (resp) {
                            return resp.text();
                        }).then(function (count) {
                            if (Number(count) > 0) {
                                var client = {
                                    ClientNo: userId,
                                    Status: '正常',
                                    MaxWithdraw: maxWithdraw,
                                    UnitLimit: 0
                                };
                                _self.tableData.push(client);
                                var setMoney = JSON.parse(localStorage.getItem('setMoney'));
                                var clientNoArr = setMoney.ClientNoArr;
                                clientNoArr.push(userId);
                                var newSetMoney = {
                                    ClientNoArr: clientNoArr,
                                    Type: setMoney.Type
                                };
                                localStorage.setItem('setMoney', JSON.stringify(newSetMoney));
                                _self.formInline.userId = '';
                            }
                            else {
                                _self.$notify({
                                    title: '温馨提示',
                                    message: '该客户号不存在！'
                                });
                            }
                        });
                    }
                    else {
                        this.$notify({
                            title: '温馨提示',
                            message: '该客户号已经存在！'
                        });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    //选择客户
    setMoney.prototype.selectCheckbox = function (selection) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var select;
            return tslib_1.__generator(this, function (_a) {
                select = clone(selection);
                this.selects = select;
                return [2 /*return*/];
            });
        });
    };
    setMoney.prototype.exportBank2 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _self, myRequests;
            return tslib_1.__generator(this, function (_a) {
                _self = this;
                myRequests = [];
                this.tableData.forEach(function (client) {
                    var url = base_1["default"].prototype.$baseUrl.imss + ("Client?$filter=(ClientNo eq '" + client.ClientNo + "')");
                    myRequests.push(url);
                });
                Promise.all(myRequests.map(function (myRequest) {
                    return fetch(myRequest).then(function (resp) {
                        return resp.json();
                    });
                })).then(function (datas) {
                    datas.forEach(function (data, index) {
                        if (data.value.length > 0) {
                            _self.tableData.forEach(function (item) {
                                if (item.ClientNo == data.value[0].ClientNo && data.value[0].BankingfuturesWholesale != null) {
                                    item.MaxWithdraw = data.value[0].BankingfuturesWholesale;
                                }
                            });
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    setMoney.prototype.Same = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log(this.selects);
                return [2 /*return*/];
            });
        });
    };
    //显示信息model
    setMoney.prototype.showModel = function (row, column, cell, event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (column.label != "" && column.label != "操作") {
                    this.modelVisible = true;
                    this.modelForm = row;
                }
                return [2 /*return*/];
            });
        });
    };
    //修改信息
    setMoney.prototype.handleSubmit = function (formName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tableData, _self;
            return tslib_1.__generator(this, function (_a) {
                tableData = this.tableData;
                _self = this;
                this.tableData.forEach(function (item) {
                    if (_self.modelForm.ClientNo == item.ClientNo) {
                        item = _self.modelForm;
                        _self.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        _self.modelVisible = false;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return setMoney;
}(base_1["default"]));
setMoney = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'setMoney',
        mixins: [setMoney_vue_1["default"]],
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
        beforeMount: function () {
            this.$xvuex.registerModule(this, this.options, this.options.gridKey);
        },
        mounted: function () {
            //var setMoney = JSON.parse(localStorage.getItem('setMoney'))
            //if (setMoney){
            //    this.setMoneyTableData(setMoney)
            //}
            this.GetDicts();
        }
    })
], setMoney);
exports["default"] = setMoney;
//# sourceMappingURL=setMoney.js.map