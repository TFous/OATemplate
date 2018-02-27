/* eslint-disable */
// 认证地址
export const identitySiteRoot = localStorage.getItem('identitySiteRootSite')
export const roleUrl = localStorage.getItem('roleUrlSite')
// api地址
export const appUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : localStorage.getItem('appUrlSite')
export const webApiRoot = localStorage.getItem('webApiRootSite')

export const apiUrlRootSite = localStorage.getItem('apiUrlRootSite')
export const mainUrlRootSite = localStorage.getItem('mainUrlRootSite')