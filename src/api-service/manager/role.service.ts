"use strict";
exports.__esModule = true;
/*
 数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../../api/http");

function getRoleList(name) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Role/GetAll?SkipCount=0&MaxResultCount=100&Filter="+name;
    return http_1.get(url);
}
exports.getRoleList = getRoleList;

function editRole(clientId,id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Role/GetRoleForEdit?clientId="+clientId+"&id="+id;
    return http_1.get(url);
}
exports.editRole = editRole;

function saveRole(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Role/Create";
    return http_1.post(url,params);
}
exports.saveRole = saveRole;


function updateRole(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Role/Update";
    return http_1.put(url,params);
}
exports.updateRole = updateRole;


function deleteRole(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "Role/Delete?id=" + id;
    return http_1.deleteById(url);
}
exports.deleteRole = deleteRole;