"use strict";
exports.__esModule = true;
/*
 数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../../api/http");

function getList(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "IdentityResource/GetAll?filter="+params;
    return http_1.get(url);
}
exports.getList = getList;


function deleteIdentity(name) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "IdentityResource/Delete?name=" + name;
    return http_1.deleteById(url);
}
exports.deleteIdentity = deleteIdentity;


function editIdentity(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "IdentityResource/GetForEdit?name="+params;
    return http_1.get(url,params);
}
exports.editIdentity = editIdentity;

function updateIdentity(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "IdentityResource/Update";
    return http_1.put(url,params);
}
exports.updateIdentity = updateIdentity;


function addIdentity(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "IdentityResource/Create";
    return http_1.post(url,params);
}
exports.addIdentity = addIdentity;
