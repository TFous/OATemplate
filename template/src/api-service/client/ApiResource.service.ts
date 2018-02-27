"use strict";
exports.__esModule = true;
/*
 数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../../api/http");

function getList(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "ApiResource/GetAll?filter="+params;
    return http_1.get(url);
}
exports.getList = getList;


function deleteApi(name) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "ApiResource/Delete?name=" + name;
    return http_1.deleteById(url);
}
exports.deleteApi = deleteApi;


function editApi(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "ApiResource/GetForEdit?name="+params;
    return http_1.get(url,params);
}
exports.editApi = editApi;

function updateApi(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "ApiResource/Update";
    return http_1.put(url,params);
}
exports.updateApi = updateApi;

function addApi(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "ApiResource/Create";
    return http_1.post(url,params);
}
exports.addApi = addApi;

function getConstants() {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Constants/Get";
    return http_1.get(url);
}
exports.getConstants = getConstants