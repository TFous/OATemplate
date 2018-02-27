"use strict";
exports.__esModule = true;
/*
 数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../../api/http");

function getClientList(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Client/GetAll?filter="+params;
    return http_1.get(url);
}
exports.getClientList = getClientList;

function getClient(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Client/Get?clientId="+params;
    return http_1.get(url,params);
}
exports.getClient = getClient;

function addClient() {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Client/GetClientForEdit";
    return http_1.get(url);
}
exports.addClient = addClient;

function saveClient(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Client/Create";
    return http_1.post(url,params);
}
exports.saveClient = saveClient;

function deleteClient(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Client/Delete?clientId=" + id;
    return http_1.deleteById(url);
}
exports.deleteClient = deleteClient;

function updateClient(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Client/Update";
    return http_1.put(url,params);
}
exports.updateClient = updateClient;


function getConstants() {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Constants/Get";
    return http_1.get(url);
}
exports.getConstants = getConstants

function GetAllScopes() {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Client/GetAllScopes";
    return http_1.get(url);
}
exports.GetAllScopes = GetAllScopes