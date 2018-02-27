"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2017/12/27.
 */
var vue_1 = require("vue");
var SvgIcon_1 = require("components/SvgIcon"); // svg组件
// register globally
vue_1["default"].component('svg-icon', SvgIcon_1["default"]);
var requireAll = function (requireContext) { return requireContext.keys().map(requireContext); };
var req = require.context('./svg', false, /\.svg$/);
requireAll(req);
//# sourceMappingURL=index.js.map