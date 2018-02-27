/**
 * Created by wisdom on 2017/12/22.
 */
import Vue from 'base'
import { Component, Watch, Prop } from 'vue-property-decorator'
import template from './login.vue'

import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../config/wucc-config'

// import {identitySiteRoot} from '../../config/site-config.js'
//
const validateUserName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('用户名不能为空'))
    } else {
        callback()
    }
}
const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else {
        callback()
    }
}

@Component({
    name: 'page-login',
    mixins: [template]
})
export default class login extends Vue {
    mounted () {
        // fixme: 挂载时获取本机记住的登录用户
        if (JSON.parse(localStorage.getItem(USERNAME_KEY))) {
            this.userSave = JSON.parse(localStorage.getItem(USERNAME_KEY))
        }
    }

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
    userSave: object = {}

    // fixme: 控制是否显示保存用户
    userSaveBox: boolean = false

    // fixme: 登录信息表单
    loginForm: object = {
        userName: '',
        password: '',
        isRemmber: true
    }

    // fixme: 登录信息表单验证规则
    loginRules: object = {
        userName: [
            { validator: validateUserName, trigger: 'blur' }
            ],
        password: [
            { validator: validatePassword, trigger: 'blur' }
            ]
    }

    // fixme: access_token 通行令牌
    access_token: string = ''

    // fixme: refresh_token 刷新令牌
    refresh_token: string = ''

    // fixme: expiresIn 过期时间
    expiresIn: number = 0

    // fixme: 登录
    async login (formName) {
        let formNameState = false
        this.$refs[formName].validate((valid) => {
            if (valid) {
                formNameState = true
            } else {
                this.$message({
                    message: '参数错误请重新填写',
                    type: 'warning'
                })
                formNameState = false
                return false
            }
        })

        if (formNameState) {
            let userName: string = this.loginForm.userName
            let password: string = this.loginForm.password
            let isRemmber: boolean = this.loginForm.isRemmber
            // fixme: 获取access_torken
            let res = await this.apiService.login.loginIn(userName, password, isRemmber)
            // if (JSON.parse(res)) {
            //
            // }
            // res = JSON.parse(res)
            if (res.access_token) {
                // fixme: 刷新access_token refresh_token expiresIn(过期时间)
                this.access_token = res.access_token
                this.refresh_token = res.refresh_token
                this.expiresIn = res.expires_in

                // fixme: 如果记住密码
                if (isRemmber === true) {
                    this.userSave[userName] = this.refresh_token
                }

                // fixme: 如果不记住密码将清空原有记录
                if (isRemmber === false && this.userSave[userName]) {
                    delete this.userSave[userName]
                }

                // fixme: 储存登录信息
                localStorage.setItem(USERNAME_KEY, JSON.stringify(this.userSave))
                // fixme: 获取用户信息
                let resUser =  await this.apiService.login.getUser(this.access_token)

                // fixme: 存入用户信息
                let userProfile = {}
                let timestamp = (new Date()).getTime() / 1000 + this.expiresIn
                userProfile.profile = resUser
                let user = Object.assign({}, userProfile, {access_token: this.access_token}, {expires_at: timestamp}, {refresh_token: this.refresh_token})

                // fixme: 储存信息成功后进入系统
                localStorage.setItem(STORAGE_IDENTITY_KEY, JSON.stringify(user))
                location.href = './'
            } else {

                // fixme: 获取登录令牌失败
                this.$notify({
                    title: '提示',
                    message: '获取登录令牌失败'
                })
                return
            }
        }
    }

    // fixme: username 聚焦显示用户信息框
    handleUserFocus () {
        this.userSaveBox = true
    }

    // fixme: username 失焦隐藏用户信息框
    handleUserBlur () {
        let _self = this
        setTimeout(function () {
            _self.userSaveBox = false
        }, 200)
    }

    // fixme: 点击载入用户信息
    handleSetUserMsg (val, key) {
        let _self = this
        if (_self.loginForm.isRemmber === true) {
            this.loginForm.password = val
            this.loginForm.userName = key
        } else {
            this.loginForm.userName = key
        }
        this.$refs['loginForm'].validate((valid) => {
            if (valid) {
            } else {
            }
        })
        _self.userSaveBox = false
    }

    @Watch('loginForm.isRemmber', { immediate: false, deep: true })
    onPersonChanged (val: boolean, oldVal: string) {
        let _self = this
        if (val === false) {
            this.loginForm.password = ''
            _self.userSave[_self.loginForm.userName] = ''
            localStorage.setItem(USERNAME_KEY, JSON.stringify(_self.userSave))
        }
    }
}
