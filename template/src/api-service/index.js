"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var http_1 = require("./../api/http");
// import modules
var login_service_1 = require("./login/login.service");
exports["default"] = {
    // fixme: 登录
    login: login_service_1["default"],
    // fixme: axios配置
    ax: http_1.ax,
    axios: axios_1["default"]
};
//# sourceMappingURL=index.js.map