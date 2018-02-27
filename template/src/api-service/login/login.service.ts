/**
 * Created by wisdom on 2017/12/23.
 */
import store from 'store'
import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../config/wucc-config'
import api from 'api'

let getAccessToken = function (url, data) {
    // 在这里使用起来就像同步代码那样直观
    let res = api.login.getAccess(url, data)
    return res
}

let getUserProfile = function (url, accessToken) {
    // 在这里使用起来就像同步代码那样直观
    let res = api.login.getUserProfile(url, accessToken)
    return res
}

let revoAccessToken = function (url, data) {
    let res = api.login.revoAccess(url, data)
    return res
}

let changePassword = function (url, data) {
    let res = api.login.changePassword(url, data)
    return res
}

let slientRenew = async function() {
    let access_token = ''
    let refresh_token = ''
    let expiresIn = ''

    let freshData: object = {
        grant_type: 'refresh_token',
        refresh_token: JSON.parse(localStorage.getItem(STORAGE_IDENTITY_KEY)).refresh_token
    }

    let resToken = await getAccessToken('', freshData)


    access_token = resToken.access_token
    refresh_token = resToken.refresh_token
    expiresIn = resToken.expires_in

    let resUser = await getUserProfile('', access_token)
    let userProfile = {}
    userProfile.profile = resUser
    let  timestamp = (new Date()).getTime() / 1000 + expiresIn
    let user = Object.assign({}, userProfile, {access_token: access_token}, {expires_at: timestamp}, {refresh_token: refresh_token})

    let callbacktime = user.expires_at - 10
    store.dispatch('auth/setUser', user)

    // fixme: 刷新本地令牌
    let userRrefresh = JSON.parse(localStorage.getItem(USERNAME_KEY))
    for (let key in userRrefresh) {
        if (key === user.profile.preferred_username) {
            userRrefresh[key] = user.refresh_token
        }
    }
    localStorage.setItem(USERNAME_KEY, JSON.stringify(userRrefresh))
    localStorage.setItem(STORAGE_IDENTITY_KEY, JSON.stringify(user))
    let newTimestamp = (new Date()).getTime() / 1000
    if (newTimestamp > callbacktime && newTimestamp < (user.expires_at - 2)) {
        slientRenew()
    }
    if (newTimestamp < callbacktime) {
        let time = (callbacktime - newTimestamp) * 1000
        setTimeout(function () {
        slientRenew()
        }, time)
    }
}

let refreshlogin = async function(refresh_tokens) {
    let access_token = ''
    let refresh_token = ''
    let expiresIn = ''

    let freshData: object = {
        grant_type: 'refresh_token',
        refresh_token: refresh_tokens
    }
    let resToken = await getAccessToken('', freshData)


    access_token = resToken.access_token
    refresh_token = resToken.refresh_token
    expiresIn = resToken.expires_in

    let resUser = await getUserProfile('', access_token)
    let userProfile = {}
    userProfile.profile = resUser
    let  timestamp = (new Date()).getTime() / 1000 + expiresIn
    let user = Object.assign({}, userProfile, {access_token: access_token}, {expires_at: timestamp}, {refresh_token: refresh_token})

    let callbacktime = user.expires_at - 10
    store.dispatch('auth/setUser', user)

    // fixme: 刷新本地令牌
    let userRrefresh = JSON.parse(localStorage.getItem(USERNAME_KEY))
    for (let key in userRrefresh) {
        if (key === user.profile.preferred_username) {
            userRrefresh[key] = user.refresh_token
        }
    }
    localStorage.setItem(USERNAME_KEY, JSON.stringify(userRrefresh))
    localStorage.setItem(STORAGE_IDENTITY_KEY, JSON.stringify(user))
    location.href = './'
}

export default{

    // fixme: 获取登录令牌
    loginIn(username: string, password: string, isRemmber: boolean): void {

        // fixme: 请求主体
        let body: object = {}

        // fixme: 登录用户信息记录
        let userSave = {}
        if (JSON.parse(localStorage.getItem(USERNAME_KEY))) {
            userSave = JSON.parse(localStorage.getItem(USERNAME_KEY))
        }
        /**
         * 登录分为密码登录与refresh_token刷新登录,
         * 记住密码为refresh_token刷新登录
         */

            // fixme: 密码登录
        let data: object = {
                username: username,
                password: password,
                grant_type: 'password',
                scope: 'openid profile roles rs_userInfo offline_access'
            }
        // fixme: refresh_token刷新登录
        let freshData: object = {
            grant_type: 'refresh_token',
            refresh_token: password
        }

        // fixme: 根据输入密码判断refresh_token刷新登录还是密码登录
        if (isRemmber === true && userSave[username] === password) {
            body = freshData
        } else {
            body = data
        }
        return getAccessToken('', body)
    },

    // fixme: 静默登录
    async slientRenew () {
        await slientRenew()
    },

    // fixme: 获取用户信息
    getUser (accessToken) {
        return getUserProfile('', accessToken)
    },

    // fixme: 退出登录
    logout () {
        let token = JSON.parse(localStorage.getItem(STORAGE_IDENTITY_KEY)).access_token
        let data = {
            token: token
        }
        return revoAccessToken('', data)
    },

    // fixme: 修改密码
    setPassword (data) {
        return changePassword('', data)
    },

    refreshlogin (refresh_token) {
        refreshlogin(refresh_token)
    }

}
