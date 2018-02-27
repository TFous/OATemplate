/**
 * Created by wisdom on 2017/12/27.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './personMenu.vue'
import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../config/wucc-config'

@Component({
    name: 'person-menu',
    mixins: [template]
})
export default class personMenu extends Vue {

    validatePass = (rule, value, callback) => {
        if (value === '' && value >= 6) {
            callback(new Error('请输入密码且密码大于等于6位'))
        } else {
            callback()
        }
    }

    validatePassCheck = (rule, value, callback) => {
        if (value === '' && value >= 6) {
            callback(new Error('请输入密码且密码大于等于6位'))
        } else if (value !== this.formCustom.NewPassword) {
            callback(new Error('两次输入密码不一致!'))
        } else {
            callback()
        }
    }

    rules: object = {
        OldPassword: [
            { validator: this.validatePass, trigger: 'blur' }
            ],
        NewPassword: [
            { validator: this.validatePass, trigger: 'blur' }
            ],
        passwdCheck: [
            { validator: this.validatePassCheck, trigger: 'blur' }
            ]
    }

    show: boolean = false

    // fixme: 控制用户信息框
    messageShow: boolean = false

    formCustom: object = {
        OldPassword: '',
        NewPassword: '',
        passwdCheck: ''
    }

    get user () {
        return this.$store.getters['auth/user']
    }

    // fixme: 登出跳转
    async logout () {
        await this.apiService.login.logout()
        localStorage.removeItem(STORAGE_IDENTITY_KEY)
        window.location.href = `/login.html`

    }

    // fixme: 控制个人信息面板
    personShow () {
        this.messageShow = !this.messageShow
    }

    async submitForm(formName) {
        let validState = false
        this.$refs[formName].validate((valid) => {
            if (valid) {
                validState = true

            } else {
                this.$message({
                    message: '请正确填写参数',
                    type: 'warning'
                })
                validState = false
                this.resetForm(formName)
                return false
            }
        })

        if (validState) {
            let data: object= {
                OldPassword: this.formCustom.OldPassword,
                NewPassword: this.formCustom.NewPassword
            }
            let res = await this.apiService.login.setPassword(data)
            this.resetForm(formName)
            this.show = false
            this.$message({
                message: '修改密码成功',
                type: 'successs'
            })
        }
    }

    resetForm(formName) {
        this.$refs[formName].resetFields()
    }

}