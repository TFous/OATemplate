"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var http_1 = require("./http");
// import modules
var product_1 = require("./modules/product");
var login_1 = require("./modules/login");
exports["default"] = {
    getPackage: function (data) {
        return http_1.get('static/api-test.json', {
            params: data
        });
    },
    login: login_1["default"],
    product: product_1["default"],
    ax: http_1.ax,
    axios: axios_1["default"]
};
//# sourceMappingURL=index.js.map