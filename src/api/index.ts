import axios from 'axios'
import { post, get, ax } from './http'

// import modules
import productApi from './modules/product'
import loginApi from './modules/login'

export default {
    getPackage (data: Types.PlainObject) {
        return get<{
            content: string
        }>('static/api-test.json', {
            params: data
        })
    },
    login: loginApi,
    product: productApi,
    ax: ax,
    axios: axios
}
