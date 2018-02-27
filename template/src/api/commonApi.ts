/**
 * Created by wisdom on 2017/3/21.
 */


function getAuthorization () {
    let  accessToken
    try {
        return 'Bearer ' + JSON.parse(localStorage.getItem('STORAGE_IDENTITY')).access_token
    } catch (e) {
    }
}

function getheaders () {
    let headers
    headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': getAuthorization()
    })
    return headers
}


export const $api = {
    headers: getheaders(),
    request: function (url: string, obj: Object = {}) {
        let initObj = Object.assign({
            method: 'GET',
            headers: getheaders(),
            mode: 'cors',
            cache: 'default'
        }, obj)
        return new Request(url, initObj)
    },
    changeTime:function (t) {  //  - 28800000 + 1000 // 8小时
        let d = new Date(t).getTime() - 28800000  // 8小时 因为带有毫秒，加一秒
        let times = new Date(d)
        let year = times.getFullYear()
        let month = (times.getMonth() + 1).toString().length === 2 ? (times.getMonth() + 1) : `0${(times.getMonth() + 1)}`
        let day = (times.getDate()).toString().length === 2 ? (times.getDate()) : `0${(times.getDate())}`
        let hours = (times.getHours()).toString().length === 2 ? (times.getHours()) : `0${(times.getHours())}`
        let minutes = (times.getMinutes()).toString().length === 2 ? (times.getMinutes()) : `0${(times.getMinutes())}`
        let seconds = (times.getSeconds()).toString().length === 2 ? (times.getSeconds()) : `0${(times.getSeconds())}`
        let milliseconds = (times.getMilliseconds()).toString()
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
    }
}
