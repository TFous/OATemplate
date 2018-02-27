
const identitySiteRootSite = 'http://wucc.wdqh.com:6789'
// 认证地址
const roleUrlSite = 'http://wucc.wdqh.com:6789/api/odata'
// api地址
const apiUrl = 'https://wucc.cefcfco.com/manage/api/services/app/'

const apiUrlRootSite = 'wucc.cefcfco.com:6789'

const mainUrlRootSite = 'wpbs.wdqh.com:6789'

// 解决url多层级报错
localStorage.setItem('identitySiteRootSite', identitySiteRootSite)
localStorage.setItem('roleUrlSite', roleUrlSite)
localStorage.setItem('apiUrl', apiUrl)
localStorage.setItem('apiUrlRootSite', apiUrlRootSite)
localStorage.setItem('mainUrlRootSite', mainUrlRootSite)


// wucc配置
const USERNAME_KEY = 'USERNAEM_KEY'
const STORAGE_IDENTITY_KEY = 'STORAGE_IDENTITY'
const CLIENT_ID = 'Wpbs'
const CLIENT_SECRET = 'secret'

localStorage.setItem('USERNAME_KEY', USERNAME_KEY)
localStorage.setItem('STORAGE_IDENTITY_KEY', STORAGE_IDENTITY_KEY)
localStorage.setItem('CLIENT_ID', CLIENT_ID)
localStorage.setItem('CLIENT_SECRET', CLIENT_SECRET)
