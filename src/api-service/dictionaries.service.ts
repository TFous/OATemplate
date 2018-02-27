/*
数据字典
 */
import Vue from 'vue'
import {get} from '../api/http'

let DataDictionaryTypeUrl = Vue.prototype.$baseUrl.imss + 'DataDictionaryType'

export function getList () {
    return get(DataDictionaryTypeUrl)
}
