/**
 * Created by wisdom on 2017/12/23.
 */
import axios from 'axios'
import * as md5 from 'md5'
import stringify = require('qs/lib/stringify')
import {identitySiteRoot} from '../../config/site-config.js'
import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../config/wucc-config'
import vue from 'vue'

import env from 'env'
// fixme: baseURL
const host: string = identitySiteRoot

// fixme: 请求token地址
const tokenUrl = '/identity/connect/token'

// fixme: 失效token地址

const revotokenUrl = `/identity/connect/revocation`

// fixme: 请求用户信息
const userUrl = '/identity/connect/userinfo'

// fixme: 更改密码
const changePasswordUrl = '/api/odata/User/WUCC.ChangePassword'

// fixme: 客户端ID
let client_id: string = CLIENT_ID

// fixme: 客户端密匙
let client_secret: string = CLIENT_SECRET
let auth: string = 'Basic ' + btoa(client_id + ':' + client_secret)

// fixme:build http header
function buildHeader(): {[key: string]: string, auth: string} {
    return {
        ['Authorization']: auth,
        ['Content-Type']: 'application/x-www-form-urlencoded'
    }
}

export let ax = axios.create({
    baseURL: host,
    headers: buildHeader(),
    timeout: 10000,
    responseType: 'json',
    transformRequest: [function(data) {
        if (data instanceof FormData) return data
        return stringify(data)
    }]
    // transformResponse: [function (data) {
    //     if (data) {
    //         return data
    //     } else {
    //         let msg = 'Unknow Error'
    //         throw new Error(msg)
    //     }
    // }]
})

function processData (data: any = {}) {
    if (data instanceof FormData) {
        // data.append('token', token)
    } else {
        // data.token = token
    }

    return data
}

// 处理错误
function handleError (err) {
    // 如果是手动取消的请求，不显示错误信息
    if (axios.isCancel(err)) {
        console.log(err)
    } else {
        alert(err)
    }
}

// http get method
function get<T>(url, accessToken): Promise<T> {
    let axGetUser = axios.create({
        baseURL: host,
        headers: {
            ['Authorization']: 'Bearer ' + accessToken
        },
        timeout: 10000,
        responseType: 'json',
        transformRequest: [function(data) {
            if (data instanceof FormData) return data
            return stringify(data)
        }],
        transformResponse: [function (data) {
            if (data) {
                return data
            } else {
                let msg = 'Unknow Error'
                throw new Error(msg)
            }
        }]
    })
    return axGetUser.get(url).then((res) => {
        return res.data
    }).catch((err) => {
        // handleError(err)
        vue.prototype.$notify.error({
            title: '出现错误',
            message: err,
            showClose: false
        })
        throw err
    })
}

// http post method
function post<T>(url, data?: Types.PlainObject): Promise<T> {
    return ax.post(url, processData(data))
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            vue.prototype.$notify.error({
                title: '出现错误',
                dangerouslyUseHTMLString: true,
                message: err.response
                // showClose: false
            })
            throw err
        })
}

// fixme: 请求user信息方法
function postPassword<T>(url, data?: Types.PlainObject): Promise<T> {
    let axGetUser = axios.create({
        baseURL: host,
        headers: {
            ['Authorization']: 'Bearer ' + JSON.parse(localStorage.getItem(STORAGE_IDENTITY_KEY)).access_token,
            ['Content-Type']: 'application/json'
        },
        timeout: 10000,
        responseType: 'json',
        transformResponse: [function (data) {
            if (data) {
                return data
            } else {
                let msg = 'Unknow Error'
                throw new Error(msg)
            }
        }]
    })
    return axGetUser.post(url, data)
        .then((res) => {
            return res
        })
        .catch((err) => {
            vue.prototype.$notify.error({
                title: '出现错误',
                message: err,
                showClose: false
            })
            throw err
        })
}


export default {
    // fixme: 请求token方法
    getAccess (url: string, data: string) {
        return post<{
            content: string
        }>(tokenUrl + url, data)
    },

    // fixme: 失效token方法
    revoAccess (url: string, data: string) {
        return post<{
            content: string
        }>(revotokenUrl + url, data)
    },

    // fixme: 请求user信息方法
    getUserProfile (url: string, accessToken: string) {
        return get<{
            content: string
        }>(userUrl + url, accessToken)
    },

    // fixme: 请求user信息方法
    changePassword (url: string, data: object) {
        return postPassword<{
            content: string
        }>(changePasswordUrl + url, data)
    }
}
