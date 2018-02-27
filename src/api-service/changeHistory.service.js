"use strict";
exports.__esModule = true;
/*
数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../api/http");
function getbeforeData(ClientNo, time) {
    var url = vue_1["default"].prototype.$baseUrl.imss + ("ClientChangeLog?$filter=ClientNo eq '" + ClientNo + "' and CreationTime le " + time + " &$orderby=CreationTime desc");
    return http_1.get(url);
}
exports.getbeforeData = getbeforeData;
//# sourceMappingURL=changeHistory.service.js.map