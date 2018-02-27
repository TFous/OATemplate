"use strict";
exports.__esModule = true;
/*
 数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../../api/http");

function getUserList(name) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/GetAll?SkipCount=0&MaxResultCount=10&Filter="+name;
    return http_1.get(url);
}
exports.getUserList = getUserList;

function addUser(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/GetUserForEdit?id="+id;
    return http_1.get(url);
}
exports.addUser = addUser;

function editUser(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/GetUserForEdit?id="+id;
    return http_1.get(url);
}
exports.editUser = editUser;

function saveUser(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/Create";
    return http_1.post(url,params);
}
exports.saveUser = saveUser;


function updateUser(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/Update";
    return http_1.put(url,params);
}
exports.updateUser = updateUser;


function deleteUser(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/Delete?Id=" + id;
    return http_1.deleteById(url);
}
exports.deleteUser = deleteUser;


function getUserPerm(id,clientId) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/GetUserPermissionsForEdit?id="+id+"&clientId="+clientId;
    return http_1.get(url);
}
exports.getUserPerm = getUserPerm;

function updateUserPerm(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "User/UpdateUserPermissions";
    return http_1.put(url,params);
}
exports.updateUserPerm = updateUserPerm;