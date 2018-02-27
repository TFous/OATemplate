"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/27.
 */
var base_1 = require("base");
var vue_property_decorator_1 = require("vue-property-decorator");
var personMenu_vue_1 = require("./personMenu.vue");
var wucc_config_1 = require("../../config/wucc-config");
var personMenu = (function (_super) {
    tslib_1.__extends(personMenu, _super);
    function personMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validatePass = function (rule, value, callback) {
            if (value === '' && value >= 6) {
                callback(new Error('请输入密码且密码大于等于6位'));
            }
            else {
                callback();
            }
        };
        _this.validatePassCheck = function (rule, value, callback) {
            if (value === '' && value >= 6) {
                callback(new Error('请输入密码且密码大于等于6位'));
            }
            else if (value !== _this.formCustom.NewPassword) {
                callback(new Error('两次输入密码不一致!'));
            }
            else {
                callback();
            }
        };
        _this.rules = {
            OldPassword: [
                { validator: _this.validatePass, trigger: 'blur' }
            ],
            NewPassword: [
                { validator: _this.validatePass, trigger: 'blur' }
            ],
            passwdCheck: [
                { validator: _this.validatePassCheck, trigger: 'blur' }
            ]
        };
        _this.show = false;
        // fixme: 控制用户信息框
        _this.messageShow = false;
        _this.formCustom = {
            OldPassword: '',
            NewPassword: '',
            passwdCheck: ''
        };
        return _this;
    }
    Object.defineProperty(personMenu.prototype, "user", {
        get: function () {
            return this.$store.getters['auth/user'];
        },
        enumerable: true,
        configurable: true
    });
    // fixme: 登出跳转
    personMenu.prototype.logout = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.login.logout()];
                    case 1:
                        _a.sent();
                        localStorage.removeItem(wucc_config_1.STORAGE_IDENTITY_KEY);
                        window.location.href = "/login.html";
                        return [2 /*return*/];
                }
            });
        });
    };
    // fixme: 控制个人信息面板
    personMenu.prototype.personShow = function () {
        this.messageShow = !this.messageShow;
    };
    personMenu.prototype.submitForm = function (formName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var validState, data, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validState = false;
                        this.$refs[formName].validate(function (valid) {
                            if (valid) {
                                validState = true;
                            }
                            else {
                                _this.$message({
                                    message: '请正确填写参数',
                                    type: 'warning'
                                });
                                validState = false;
                                _this.resetForm(formName);
                                return false;
                            }
                        });
                        if (!validState) return [3 /*break*/, 2];
                        data = {
                            OldPassword: this.formCustom.OldPassword,
                            NewPassword: this.formCustom.NewPassword
                        };
                        return [4 /*yield*/, this.apiService.login.setPassword(data)];
                    case 1:
                        res = _a.sent();
                        this.resetForm(formName);
                        this.show = false;
                        this.$message({
                            message: '修改密码成功',
                            type: 'successs'
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    personMenu.prototype.resetForm = function (formName) {
        this.$refs[formName].resetFields();
    };
    return personMenu;
}(base_1["default"]));
personMenu = tslib_1.__decorate([
    vue_property_decorator_1.Component({
        name: 'person-menu',
        mixins: [personMenu_vue_1["default"]]
    })
], personMenu);
exports["default"] = personMenu;
//# sourceMappingURL=personMenu.js.map