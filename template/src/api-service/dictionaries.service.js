"use strict";
exports.__esModule = true;
/*
数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../api/http");
var DataDictionaryTypeUrl = vue_1["default"].prototype.$baseUrl.imss + 'DataDictionaryType';
function getList() {
    return http_1.get(DataDictionaryTypeUrl);
}
exports.getList = getList;
//# sourceMappingURL=dictionaries.service.js.map