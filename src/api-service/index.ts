import axios from 'axios'
import { post, get, ax } from './../api/http'
// import modules
import login from './login/login.service'

export default {
    // fixme: 登录
    login: login,

    // fixme: axios配置
    ax: ax,
    axios: axios
}
