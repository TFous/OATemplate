"use strict";
exports.__esModule = true;
/*
 数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../../api/http");

function getPermList(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "PermissionDefinition/Get?clientId="+id;
    return http_1.get(url);
}
exports.getPermList = getPermList;

function savePerm(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "PermissionDefinition/Create";
    return http_1.post(url,params);
}
exports.savePerm = savePerm;


function updatePerm(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "PermissionDefinition/Update";
    return http_1.put(url,params);
}
exports.updatePerm = updatePerm;


function deletePerm(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "PermissionDefinition/Delete?id=" + id;
    return http_1.deleteById(url);
}
exports.deletePerm = deletePerm;