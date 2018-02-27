import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'

// routes
// import homeRoute from './home'
// import productRoute from './product'
import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../config/wucc-config'

Vue.use(Router)

const constantRouterMap = [
    { path: '/404', component: getView('error404'), hidden: true }
]

const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true },

    {
        path: '/',
        component: getView(`home`),
        redirect: '/home',
        name: 'home',
        hidden: true
    },
    {
        path: '/home',
        component: Layout,
        redirect: '/home/home',
        name: 'home',
        hidden: true,
        meta: {title: '首页', icon: 'component'},
        children: [{
            path: 'home',
            name: 'home',
            component: getView(`home`),
            meta: { title: '首页', icon: 'component'}
        }]
    },
    {
        path: '/manager',
        component: Layout,
        redirect: '/manager',
        name: 'manager',
        meta: {title: '管理', icon: 'component'},
        //hidden: true,
        children: [{
            path: 'organization',
            name: 'organization',
            component: getView(`manager/organization`),
            meta: { title: '组织机构', icon: 'organization2'}
        },{
            path: 'permission',
            name: 'permission',
            component: getView(`manager/permission`),
            meta: { title: '权限管理', icon: 'organization'}
        },{
            path: 'roles',
            name: 'roles',
            component: getView(`manager/roles`),
            meta: { title: '角色', icon: 'roles'}
        },{
            path: 'users',
            name: 'users',
            component: getView(`manager/users`),
            meta: { title: '用户', icon: 'users'}
        }]
    },
    {
        path: '/client',
        component: Layout,
        redirect: '/client',
        name: 'client',
        meta: {title: '客户端', icon: 'client3'},
        //hidden: true,
        children: [{
            path: 'manager',
            name: 'manager',
            component: getView(`client/manager`),
            meta: { title: '客户端管理', icon: 'client5'}
        },{
            path: 'ApiResource',
            name: 'ApiResource',
            component: getView(`client/ApiResource`),
            meta: { title: 'ApiResource', icon: 'API2'}
            /*,
            children: [{
                path: 'ApiResource',
                name: 'ApiResource',
                component: getView(`client/scope/ApiResource`),
                meta: { title: 'ApiResource', icon: 'organization2'}
            },{
                path: 'IdentityResource',
                name: 'IdentityResource',
                component: getView(`client/scope/ApiResource`),
                meta: { title: 'IdentityResource', icon: 'roles'}
            }]*/
        }, {
            path: 'IdentityResource',
            name: 'IdentityResource',
            component: getView(`client/IdentityResource`),
            meta: {title: 'IdentityResource', icon: 'client4'}
        }
        ]
    }
]

function getView (name): any {
    return (resolve, reject) => {
        require.ensure([], (require) => {
            resolve(require(`pages/${name}/index.ts`))
        }, reject, 'product')
    }
}

/*
if (localStorage.getItem(STORAGE_IDENTITY_KEY) === null) {
    location.href = 'login.html'
    // Vue.prototype.$alert('登录已经失效请重新登陆', '登录失效', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //         location.href = 'login.html'
    //     }
    // })
}
let role
let profile = JSON.parse(localStorage.getItem(STORAGE_IDENTITY_KEY)).profile
if(typeof profile === 'object'){
    role = profile.role
}else {
    role = JSON.parse(profile).role
}

function getView (name): any {
    return (resolve, reject) => {
        require.ensure([], (require) => {
            resolve(require(`pages/${name}/index.ts`))
        }, reject, 'product')
    }
}

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}
*/

let accessedRouters = asyncRouterMap

/*
 let accessedRouters
 if (role.indexOf('superAdmin') >= 0) {
    accessedRouters = asyncRouterMap
} else {
    accessedRouters = filterAsyncRouter(asyncRouterMap, role)
}*/

export let routers = constantRouterMap.concat(accessedRouters)

let routes: Router.RouteConfig[] = routers


export default new Router({
    mode: 'history',
    routes: routes
})




