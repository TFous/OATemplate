"use strict";
exports.__esModule = true;
/*
 数据字典
 */
var vue_1 = require("vue");
var http_1 = require("../../api/http");

function getList() {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "OrganizationUnit/GetOrganizationUnits";
    return http_1.get(url);
}
exports.getList = getList;

function saveOrg(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "OrganizationUnit/CreateOrganizationUnit";
    return http_1.post(url,params);
}
exports.saveOrg = saveOrg;

function deleteOrg(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "OrganizationUnit/DeleteOrganizationUnit?id=" + id;
    return http_1.deleteById(url);
}
exports.deleteOrg = deleteOrg;

function updateOrg(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "OrganizationUnit/UpdateOrganizationUnit";
    return http_1.put(url,params);
}
exports.updateOrg = updateOrg;

function addOrgUser(params) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "OrganizationUnit/AddUsersToOrganizationUnit";
    return http_1.post(url,params);
}
exports.addOrgUser = addOrgUser;


function getOrgUserList(id) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "OrganizationUnit/GetOrganizationUnitUsers?Id="+id+"&SkipCount=0&MaxResultCount=100";
    return http_1.get(url);
}
exports.getOrgUserList = getOrgUserList;


function deleteOrgUser(userId,orgId) {
    var url = vue_1["default"].prototype.$baseUrl.apiUrl + "OrganizationUnit/RemoveUserFromOrganizationUnit?userId="+userId+"&organizationUnitId=" + orgId;
    return http_1.deleteById(url);
}
exports.deleteOrgUser = deleteOrgUser;