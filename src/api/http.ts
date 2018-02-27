/**
 * api http base
 * @author Allenice
 * @since 2017-06-30 05:35:10
 */

import axios from 'axios'
import * as md5 from 'md5'
import stringify = require('qs/lib/stringify')
import store from 'store'
import Vue from 'vue'
import ElementUI from 'element-ui'

require('es6-promise').polyfill();
require('isomorphic-fetch');
Vue.use(ElementUI, {size: 'mini'})

const host = '/'

// build http header
function buildHeader(): { [key: string]: string } {
    return {}
}

export let ax = axios.create({
    baseURL: host,
    headers: buildHeader(),
    timeout: 10000,
    responseType: 'json',
    transformRequest: [function (data) {
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

// function processData (data: any = {}) {
//     if (data instanceof FormData) {
//         // data.append('token', token)
//     } else {
//         // data.token = token
//     }
//
//     return data
// }

// 处理错误
function handleError(err) {
    // 如果是手动取消的请求，不显示错误信息
    if (axios.isCancel(err)) {
        console.log(err)
    } else {
        alert(err)
    }
}

// http get method
export function get <T>(url): Promise<T> {
    let isRequestOk
    let requestDataHeader = Vue.prototype.$api.request(url)
    return fetch(requestDataHeader).then(resp => {
        isRequestOk = resp.ok
        return resp.json()
    }).then(data => {
        if (isRequestOk === false) {
            Vue.prototype.$notify.error({
                title: '错误消息',
                message: data.message
            })
            return false
        }
        return data
    })
}

// http post method
export function post<T>(url, params): Promise<T> {
    // return ax.post(url, data)
    //     .then((res) => {
    //         return res.data
    //     })
    //     .catch((err) => {
    //         handleError(err)
    //         throw err
    //     })
    let isRequestOk
    let requestDataHeader = Vue.prototype.$api.request(url,{
        method: 'POST',
        body: JSON.stringify(params)
    })
    return fetch(requestDataHeader).then(resp => {
        isRequestOk = resp.ok
        return resp.json()
    }).then(data => {
        if (isRequestOk === false) {
            /*Vue.prototype.$notify.error({
                title: '错误消息',
                message: data.message
            })*/
        }
        return data
        //return data
    })
}

export function update<T>(url, params): Promise<T> {
    // return ax.post(url, data)
    //     .then((res) => {
    //         return res.data
    //     })
    //     .catch((err) => {
    //         handleError(err)
    //         throw err
    //     })
    let isRequestOk
    let requestDataHeader = Vue.prototype.$api.request(url,{
        method: 'POST',
        body: JSON.stringify(params)
    })
    return fetch(requestDataHeader).then(resp => {
        if (resp.ok === true) {
            isRequestOk = resp.ok
            return true
        } else {
            return resp.json()
        }
    }).then(data => {
        if (isRequestOk === false) {
            Vue.prototype.$notify.error({
                title: '错误消息',
                message: data.message
            })
            return false
        }
        return data
    })
}

export function put<T>(url, params): Promise<T> {
    let isRequestOk
    let requestDataHeader = Vue.prototype.$api.request(url,{
        method: 'PUT',
        body: JSON.stringify(params)
    })
    return fetch(requestDataHeader).then(resp => {
        isRequestOk = resp.ok
        return resp.json()
    }).then(data => {
        return data
    })
}
// http delete method
function deleteById(url) {
    let isRequestOk
    var requestDataHeader = Vue.prototype.$api.request(url, {method: 'DELETE'})
    return fetch(requestDataHeader).then(function (resp) {
        isRequestOk = resp.ok
        return resp.json()
    }).then(function (data) {
        return data
    });

}
exports.deleteById = deleteById;
// delete, put, patch,etc ....
