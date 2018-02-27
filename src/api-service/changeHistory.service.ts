/*
数据字典
 */
import Vue from 'vue'
import {post} from '../api/http'

export function getafterData (ClientId,BatchNo) {
    let url = Vue.prototype.$baseUrl.imss + `ClientChangeLog/IMSS.Search?$filter=ClientId eq ${ClientId} and BatchNo eq '${BatchNo}' and ChangeLogType eq 'before'`
    return post(url,{})
}
