// import * as RoleMap from './role-map.js'
/**
 *
 * index 为唯一标识,vuex state 存储
 */
import menuRole from './menuRole'
let menus = [
    {
        name: 'app',
        text: '首页',
        index: '1',
        icon: '',
        display: false,
        dir: 'page/app',
        path: '/app',
        meta: {
            requiresAuth: true,
            role: '*'
        }
    },
    {
        name: 'Product',
        text: '产品筛选',
        index: '2',
        icon: 'fa-yelp',
        display: false,
        path: '/myProduct',
        child: [
            {
                dir: 'page/product',
                name: 'myProduct',
                text: '我的产品',
                index: '2-1',
                icon: 'fa-tag',
                path: '/myProduct',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            },
            {
                dir: 'page/product',
                name: 'myFocus',
                text: '我的关注',
                index: '2-3',
                path: '/myFocus',
                icon: 'fa-bar-chart',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            }
        ]
    },
    {
        name: 'exlGroup',
        text: '组合报表',
        index: '3',
        path: '/dayexlGroup',
        icon: 'fa-pie-chart',
        dir: 'page/exl',
        display: false,
        child: [
            {
                dir: 'page/exl',
                name: 'dayexlGroup',
                text: '组合报表',
                index: '3-2',
                path: '/dayexlGroup',
                icon: 'fa-line-chart',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                },
                child: [
                    {
                        name: 'dayexlGroup',
                        text: '组合日报表',
                        index: '2-3',
                        path: '/dayexlGroup',
                        icon: 'fa-bar-chart',
                        display: false,
                        meta: {
                            requiresAuth: true,
                            role: '*'
                        }
                    },
                    {
                        name: 'weekexlGroup',
                        text: '组合周报表',
                        index: '2-4',
                        path: '/weekexlGroup',
                        icon: 'fa-bar-chart',
                        display: false,
                        meta: {
                            requiresAuth: true,
                            role: '*'
                        }
                    }
                ]
            }
        ]
    },
    {
        name: 'myOrganization',
        text: '我的平台',
        index: '5',
        icon: 'fa-skyatlas',
        path: '/proSetting',
        display: false,
        child: [
            {
                dir: 'page/auth',
                name: 'productSetting',
                text: '产品设置',
                index: '5-5',
                path: '/proSetting',
                icon: 'fa-cog',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            },
            {
                dir: 'page/auth',
                name: 'groupSetting',
                text: '虚拟组合设置',
                index: '5-6',
                path: '/groupSetting',
                icon: 'fa-cube',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            },
            {
                dir: 'page/auth',
                name: 'dataDictionary',
                text: '数据字典',
                index: '5-7',
                path: '/marketDictionary',
                icon: 'fa-file',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                },
                child: [
                    {
                        name: 'marketDictionary',
                        text: '市值分布设定',
                        index: '2-3',
                        path: '/marketDictionary',
                        icon: 'fa-picture-o',
                        display: false,
                        meta: {
                            requiresAuth: true,
                            role: '*'
                        }
                    }
                    // {
                    //     name: 'exchangeDictionary',
                    //     text: '交易所词典',
                    //     index: '2-3',
                    //     path: '/exchangeDictionary',
                    //     icon: 'fa-calendar-check-o',
                    //     display: false,
                    //     meta: {
                    //         requiresAuth: true,
                    //         role: '*'
                    //     }
                    // },
                    // {
                    //     name: 'varietyDictionary',
                    //     text: '品种词典',
                    //     index: '2-3',
                    //     path: '/varietyDictionary',
                    //     icon: 'fa-cog',
                    //     display: false,
                    //     meta: {
                    //         requiresAuth: true,
                    //         role: '*'
                    //     }
                    // }
                ]
            },
            {
                dir: 'page/auth',
                name: 'historyExl',
                text: '历史日报表记录',
                index: '5-8',
                path: '/historyExl',
                icon: 'fa-tags',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            }
            // {
            //   dir: 'page/auth',
            //   name: 'organizationSetting',
            //   text: '机构设置',
            //   index: '5-1',
            //   path: '/organizationSetting',
            //   icon: 'fa-cog',
            //   display: false,
            //   meta: {
            //     requiresAuth: true,
            //     role: '*'
            //   }
            // },
            // {
            //   dir: 'page/auth',
            //   name: 'userSetting',
            //   text: '用户设置',
            //   index: '5-2',
            //   path: '/userSetting',
            //   icon: 'fa-cog',
            //   display: false,
            //   meta: {
            //     requiresAuth: true,
            //     role: '*'
            //   }
            // },
            // {
            //   dir: 'page/auth',
            //   name: 'roleSetting',
            //   text: '角色设置',
            //   index: '5-3',
            //   path: '/roleSetting',
            //   icon: 'fa-cog',
            //   display: false,
            //   meta: {
            //     requiresAuth: true,
            //     role: '*'
            //   }
            // },
            // {
            //   dir: 'page/auth',
            //   name: 'clientSetting',
            //   text: '委托人设置',
            //   index: '5-4',
            //   path: '/clientSetting',
            //   icon: 'fa-cog',
            //   display: false,
            //   meta: {
            //     requiresAuth: true,
            //     role: '*'
            //   }
            // }
            // , {
            //     dir: 'page/auth',
            //     name: 'baseSetting',
            //     text: '基础设置',
            //     index: '5-7',
            //     path: '/baseSetting',
            //     icon: 'fa-cog',
            //     display: false,
            //     meta: {
            //         requiresAuth: true,
            //         role: '*'
            //     }
            // }
        ]
    },
    {
        name: 'role',
        text: '权限管理',
        index: '7',
        icon: '',
        display: false,
        dir: 'page/role',
        path: '/userManager',
        child: [
            {
                dir: 'page/role',
                name: 'userGroupRole',
                text: '产品组合权限管理',
                index: '6-1',
                path: '/userGroupRole',
                icon: 'fa-sitemap',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            },
            {
                dir: 'page/role',
                name: 'userManager',
                text: '用户管理',
                index: '6-1',
                path: '/userManager',
                icon: 'fa-user',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            },
            {
                dir: 'page/role',
                name: 'templateManagement',
                text: '权限模版管理',
                index: '6-2',
                path: '/templateManagement',
                icon: 'fa-cog',
                display: false,
                meta: {
                    requiresAuth: true,
                    role: '*'
                }
            }
        ]
    },
    {
        name: 'upLoad',
        text: '上传',
        index: '6',
        icon: '',
        display: false,
        dir: 'page/reports',
        path: '/CreateReport',
        meta: {
            requiresAuth: true,
            role: '*'
        }
    }]
if (menuRole[menuRole.length - 1] === 'superAdmin') {
    menus.forEach(function (module) {
        module.display = true
        if (module.child) {
            module.child.forEach(function (menusItem) {
                menusItem.display = true
                if (menusItem.child) {
                    menusItem.child.forEach(function (menu) {
                        menu.display = true
                    })
                }
            })
        }
    })
    menus[2].child[0].child[1].display = false
} else {
    menus.forEach(function (module, keys) {
        menuRole.forEach(function (item) {
            if ('PMS_' + module.name === item) {
                menus[keys].display = true
            }
            if (module.child) {
                module.child.forEach(function (menusItem, key) {
                    if ('PMS_' + menusItem.name === item) {
                        menus[keys].child[key].display = true
                        if (menusItem.child) {
                            menusItem.child.forEach(function (menu, subkey) {
                                menuRole.forEach(function (subitem) {
                                    if ('PMS_' + menu.name === subitem) {
                                        menus[keys].child[key].child[subkey].display = true
                                    }
                                })
                            })
                        }
                    }
                })
            }
        })
    })
    menus[0].display = true
}
export default menus
