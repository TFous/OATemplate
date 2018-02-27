/*
数据字典
 */
import Vue from 'vue'
import {get} from '../api/http'

export function getDetailData (SerialNo) {
    let url = Vue.prototype.$baseUrl.imss + `SyncLog?$filter=SerialNo eq '${SerialNo}'`
    return get(url)
}
