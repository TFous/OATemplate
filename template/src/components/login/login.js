"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/22.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var login_vue_1 = require("./login.vue");
var wucc_config_1 = require("../../config/wucc-config");
// import {identitySiteRoot} from '../../config/site-config.js'
//
var validateUserName = function (rule, value, callback) {
    if (value === '') {
        callback(new Error('用户名不能为空'));
    }
    else {
        callback();
    }
};
var validatePassword = function (rule, value, callback) {
    if (value === '') {
        callback(new Error('密码不能为空'));
    }
    else {
        callback();
    }
};
var login = (function (_super) {
    tslib_1.__extends(login, _super);
    function login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // watch: {
        //     'formCustom.savePassword': function (val) {
        //         let _self = this
        //         if (val === false) {
        //         this.formCustom.passwd = ''
        //         _self.userNameSave[_self.formCustom.username] = ''
        //         localStorage.setItem(USERNAME_KEY, JSON.stringify(_self.userNameSave))
        //     }
        // }
        // fixme: 本机记住的登录用户
        _this.userSave = {};
        // fixme: 控制是否显示保存用户
        _this.userSaveBox = false;
        // fixme: 登录信息表单
        _this.loginForm = {
            userName: '',
            password: '',
            isRemmber: true
        };
        // fixme: 登录信息表单验证规则
        _this.loginRules = {
            userName: [
                { validator: validateUserName, trigger: 'blur' }
            ],
            password: [
                { validator: validatePassword, trigger: 'blur' }
            ]
        };
        // fixme: access_token 通行令牌
        _this.access_token = '';
        // fixme: refresh_token 刷新令牌
        _this.refresh_token = '';
        // fixme: expiresIn 过期时间
        _this.expiresIn = 0;
        return _this;
    }
    login.prototype.mounted = function () {
        // fixme: 挂载时获取本机记住的登录用户
        if (JSON.parse(localStorage.getItem(wucc_config_1.USERNAME_KEY))) {
            this.userSave = JSON.parse(localStorage.getItem(wucc_config_1.USERNAME_KEY));
        }
    };
    // fixme: 登录
    login.prototype.login = function (formName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var formNameState, userName, password, isRemmber, res, resUser, userProfile, timestamp, user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formNameState = false;
                        this.$refs[formName].validate(function (valid) {
                            if (valid) {
                                formNameState = true;
                            }
                            else {
                                _this.$message({
                                    message: '参数错误请重新填写',
                                    type: 'warning'
                                });
                                formNameState = false;
                                return false;
                            }
                        });
                        if (!formNameState) return [3 /*break*/, 4];
                        userName = this.loginForm.userName;
                        password = this.loginForm.password;
                        isRemmber = this.loginForm.isRemmber;
                        return [4 /*yield*/, this.apiService.login.loginIn(userName, password, isRemmber)
                            // if (JSON.parse(res)) {
                            //
                            // }
                            // res = JSON.parse(res)
                        ];
                    case 1:
                        res = _a.sent();
                        if (!res.access_token) return [3 /*break*/, 3];
                        // fixme: 刷新access_token refresh_token expiresIn(过期时间)
                        this.access_token = res.access_token;
                        this.refresh_token = res.refresh_token;
                        this.expiresIn = res.expires_in;
                        // fixme: 如果记住密码
                        if (isRemmber === true) {
                            this.userSave[userName] = this.refresh_token;
                        }
                        // fixme: 如果不记住密码将清空原有记录
                        if (isRemmber === false && this.userSave[userName]) {
                            delete this.userSave[userName];
                        }
                        // fixme: 储存登录信息
                        localStorage.setItem(wucc_config_1.USERNAME_KEY, JSON.stringify(this.userSave));
                        return [4 /*yield*/, this.apiService.login.getUser(this.access_token)
                            // fixme: 存入用户信息
                        ];
                    case 2:
                        resUser = _a.sent();
                        userProfile = {};
                        timestamp = (new Date()).getTime() / 1000 + this.expiresIn;
                        userProfile.profile = resUser;
                        user = Object.assign({}, userProfile, { access_token: this.access_token }, { expires_at: timestamp }, { refresh_token: this.refresh_token });
                        // fixme: 储存信息成功后进入系统
                        localStorage.setItem(wucc_config_1.STORAGE_IDENTITY_KEY, JSON.stringify(user));
                        location.href = './';
                        return [3 /*break*/, 4];
                    case 3:
                        // fixme: 获取登录令牌失败
                        this.$notify({
                            title: '提示',
                            message: '获取登录令牌失败'
                        });
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // fixme: username 聚焦显示用户信息框
    login.prototype.handleUserFocus = function () {
        this.userSaveBox = true;
    };
    // fixme: username 失焦隐藏用户信息框
    login.prototype.handleUserBlur = function () {
        var _self = this;
        setTimeout(function () {
            _self.userSaveBox = false;
        }, 200);
    };
    // fixme: 点击载入用户信息
    login.prototype.handleSetUserMsg = function (val, key) {
        var _self = this;
        if (_self.loginForm.isRemmber === true) {
            this.loginForm.password = val;
            this.loginForm.userName = key;
        }
        else {
            this.loginForm.userName = key;
        }
        this.$refs['loginForm'].validate(function (valid) {
            if (valid) {
            }
            else {
            }
        });
        _self.userSaveBox = false;
    };
    login.prototype.onPersonChanged = function (val, oldVal) {
        var _self = this;
        if (val === false) {
            this.loginForm.password = '';
            _self.userSave[_self.loginForm.userName] = '';
            localStorage.setItem(wucc_config_1.USERNAME_KEY, JSON.stringify(_self.userSave));
        }
    };
    return login;
}(base_1["default"]));
tslib_1.__decorate([
    vue_property_decorator_1.Watch('loginForm.isRemmber', { immediate: false, deep: true })
], login.prototype, "onPersonChanged");
login = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'page-login',
        mixins: [login_vue_1["default"]]
    })
], login);
exports["default"] = login;
//# sourceMappingURL=login.js.map