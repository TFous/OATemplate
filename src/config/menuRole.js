/**
 * Created by wisdom on 2017/6/20.
 */
let role = []
let menuRole = []
if (JSON.parse(localStorage.getItem('STORAGE_IDENTITY'))) {
    role = JSON.parse(localStorage.getItem('STORAGE_IDENTITY')).profile.role
    if (JSON.parse(localStorage.getItem('STORAGE_IDENTITY')).profile.SuperAdmin === 'True') {
        menuRole.push('superAdmin')
    } else {
        role.forEach(function (item, key) {
            if (item.indexOf(`|`) === -1) {
                menuRole.push(item)
            }
        })
    }
} else {
    menuRole = []
}
export default menuRole
