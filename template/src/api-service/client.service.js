"use strict";
exports.__esModule = true;
/*
数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../api/http");
function deleteSecondSeat(Id) {
    var url = vue_1["default"].prototype.$baseUrl.imss + "ClientSecondSeat("+ Id +")";
    return http_1.deleteById(url);
}
exports.deleteSecondSeat = deleteSecondSeat;


function deleteClient(url,data) {
    debugger
    var url = vue_1["default"].prototype.$baseUrl.imss + "Client/IMSS.DeleteClient";
    return http_1.update(url,data);
}
exports.deleteClient = deleteClient;
//# sourceMappingURL=changeHistory.service.js.map