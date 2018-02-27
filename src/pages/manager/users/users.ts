/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './users.vue'
import { routers } from 'router'
const clone = require('clone')
import tree from './../../widgets/tree/tree'
import {getUserList, addUser, saveUser, editUser, updateUser, deleteUser, getUserPerm, updateUserPerm} from '../../../api-service/manager/user.service'
import {getClientList} from '../../../api-service/client/manager.service'
import {getRoleList} from '../../../api-service/manager/role.service'
import {getList} from '../../../api-service/manager/organization.service'
import {getPermList} from '../../../api-service/manager/permission.service'

const validatePass = (rule, value, callback) => {
    if (value === '' || value === null) {
        callback(new Error('请输入密码'));
    } else {
        if((value).toString().length < 6 || (value).toString().length > 32){
            callback(new Error('请输入6-32个字符的密码'));
        }
        /*if (this.form.password2 !== '' && this.form.password2 !== null) {
            this.$refs.form.validateField('password2');
        }*/
        callback();
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '' || value === null || value === undefined) {
        callback(new Error('请再次输入密码'));
    }/* else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }*/
}
/*const validateBank = (rule, value, callback) => {
    if (value != null) {
        if((value).toString().length > 15){
            callback(new Error('请输入15位以内的数字！'));
        }
        callback();
    } else {
        callback();

    }
}*/
@Component({
    name: 'users',
    mixins: [template],
    watch: {
        'getState.initTableData': {
            handler: function (val, oldVal) {

                if (oldVal !== undefined) {
                    this.setFilters()
                    this.setTableData(val)
                }
            },
            deep: true
        },
        'dialogVisible':{
            handler: function (val, oldVal) {
                if (oldVal !== undefined) {
                    if(val == false){
                        this.handleReset('form')
                    }
                }
            },
            deep: true
        },
    },
    components: {
        'tree': tree
    },
    mounted() {
        this.initData('')
        this.getClientList()
        //this.getAllPermList()
        //this.getRoleList()
       // this.getOrgList()
    }
})



export default class users extends Vue {

    options: any = Object.assign({}, Vue.prototype.$xvuex.options, {
        border:false,
        url: Vue.prototype.$baseUrl.imss + 'DataDictionary?$filter=(TypeId eq 3)',
        urlParameter: {
            $filter: '',
            $orderby: '',
            $expand: ''
        },
        dicUrls: {
            /*SecondSeatSystemDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary`,
            SecondSeatStatusDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary`*/
        },
        title: '次席系统',  // 本页面名称
        gridKey: 'DataDictionary',  // 本页面 Eng名，唯一
        isSelection: false, // 是否开启多选checkBox
        table: [
            {
                key: 'Id',
                title: 'ID',
                addLayer: 'hide',   // 新增页面是否显示：show  hide,默认show
                editLayer: 'hide', // 编辑页面 是否显示：show  hide,默认show
                searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                column: 'hide',  // 列表 是否显示：show  hide,默认show
                width: 'auto',   // 长度 200,默认auto
                type: 'number'  // 默认 string  ，种类：string  number select remoteMethod
            },
            {
                key: 'Name',//UserName
                title: '登录名',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'FullName',
                title: '名称',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'SalesDepartment',
                title: '部门',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'IsSuperAdmin',
                title: '超级管理员',
                searchKey: 'hide',
                selects: [{value:true,text:'是'},{value:false,text:'否'}],
                type: 'select',
                filter: true,
                filters: [{value:`(IsSuperAdmin eq true)`,text:'是'},{value:`(IsSuperAdmin eq false)`,text:'否'}],
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'IsManager',
                title: '管理员',
                searchKey: 'hide',
                selects: [{value:true,text:'是'},{value:false,text:'否'}],
                type: 'select',
                filter: true,
                filters: [{value:`(IsManager eq true)`,text:'是'},{value:`(IsManager eq false)`,text:'否'}],
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'Code',//Enabled
                title: '启用',
                searchKey: 'hide',
                selects: [{value:true,text:'是'},{value:false,text:'否'}],
                type: 'select',
                filter: true,
                filters: [{value:`(Enabled eq true)`,text:'是'},{value:`(Enabled eq false)`,text:'否'}],
                rules: [{required: true, message: '必填'}]
                /*render: [
                    {
                        fn: this.setTagType,
                        type: 'primary',
                        tag: 'button',
                        text: ''
                    }
                ]*/
            },
            {
                key: 'action',
                title: '操作',
                addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                editLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                fixed: 'right',
                render: [
                    {
                        fn: this.showViewModel,
                        type: 'primary',
                        tag: 'button',
                        text: '编辑'
                    },
                    {
                        fn: this.setTagType,
                        fn2:this.getType,
                        tag: 'tag',
                        TagValue:'Code',
                        TypeFilter:[{Value:'禁用',Type: 'danger'},{Value:'启用',Type: 'success'}]
                    },/*
                    {
                        fn: this.editRow,
                        tag: 'button',
                        type: 'success',
                        text: '是否启用'
                    },*/
                    {
                        fn: this.editRow,
                        tag: 'button',
                        type: 'warning',
                        text: '设置密码'
                    }
                ]
            }
        ]
    })

    dialogVisible:boolean = false
    activeName:string = 'users'
    selectPermissions: Array<object> = []
    checked:boolean = true
    selectRoles: Array<object> = []
    roleData: Array<object> = []
    ruleForm: object = {
        userName: [{required: true, message: '请输入登录名', trigger: 'blur'}],
        surname: [{required: true, message: '请输入姓', trigger: 'blur'}],
        name: [{required: true, message: '请输入名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'},
            { validator: validatePass, message: '', trigger: 'blur' }],
        password2: [
            { validator: validatePass2, message: '', trigger: 'blur' }],
        emailAddress: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
    }
    form:object = {
        userName: null,
        name: null,
        surname: null,
        emailAddress: null,
        isActive: false,
        roleNames: [],
        organizationUnitIDs: [],
        password:'',
        password2:''

    }
    password2:string = ''
    title:string = ''
    filterText:string = null
    initAllTable: Array<object> = []
    allTable: Array<object> = []
    tableData: Array<object> = []
    totalCount:number = 0
    curentPage:number = 1
    pageSize:number= 20
    pageSizes: Array<object> = [20,30,50]
    isEdit:boolean = false
    checkedPerm: Array<object> = []
    orgData: Array<object> = []
    checkedOrg: Array<object> = []

    permDialogVisible:boolean = false
    client:string = ''
    clientList: Array<object> = []
    permTreeData: Array<object> = []
    checkedPerm: Array<object> = []
    curUser:object={}
    initPermData: Array<object> =[]
    selectPermissions: Array<object> = []
    async initData(name){
        let data = await getUserList(name)
        let result = data.result.items //.reverse()
        this.initAllTable = result
        let resultData = clone(result)
        resultData.forEach(function(item){
            if(item.isActive){
                item.isActive = '是'
            }else{
                item.isActive = '否'
            }
        })
        this.allTable = resultData
        if(this.allTable){
            this.totalCount = data.result.totalCount
        }else{
            this.totalCount = 0
        }
        this.handleCurrentChange(this.curentPage)
    }
    async getAllPermList(){
        let data = await getPermList('')
        this.initPermData = data.result
    }
    async getClientList(){
        let data = await getClientList('')
        this.clientList = data.result
    }
    async getRoleList(){
        let data = await getRoleList(name)
        let result = data.result.items
        this.roleData = result
    }

    async getOrgList(){
        let data = await getList()
        this.orgData = data.result
    }

    handleSizeChange(val) {
        let totalPage = Math.ceil(this.totalCount/val)
        this.pageSize = val
        if(this.curentPage < totalPage){
            let start = (this.curentPage - 1)*val
            let end = start + val
            this.tableData = this.allTable.slice(start, end)
        }else if(this.curentPage == totalPage){
            let start = (this.curentPage - 1)*val
            let end = this.totalCount
            this.tableData = this.allTable.slice(start, end)
        }
    }
    handleCurrentChange(val) {
        let totalPage = Math.ceil(this.totalCount/this.pageSize)
        this.curentPage = val
        if(val < totalPage){
            let start = (val - 1)*this.pageSize
            let end = start + this.pageSize
            this.tableData = this.allTable.slice(start, end)
        }else if(val == totalPage){
            let start = (val - 1)*this.pageSize
            let end = this.totalCount
            this.tableData = this.allTable.slice(start, end)
        }
    }
    search(){
        this.initData(this.filterText)
    }
    handleReset(name) {
        this.$refs[name].resetFields()
    }
    async showModel(){
        this.dialogVisible = true
        this.title = '新增用户'
        this.activeName = 'first'
        this.isEdit = false
        let data = await addUser('')
        let result = data.result
        this.checkedOrg = []
        this.form = {
            userName: result.user.userName,
            name: result.user.name,
            surname: result.user.surname,
            emailAddress: result.user.emailAddress,
            isActive: result.user.isActive,
            roleNames: [],
            organizationUnitIDs: []
        }
        this.roleData = result.roles
        this.orgData = result.allOrganizationUnits
    }
    async showViewModel(row){
        this.dialogVisible = true
        this.title = '编辑用户'
        this.activeName = 'first'
        this.isEdit = true
        let data = await editUser(row.id)
        let result = data.result
        let orgArr = []
        result.memberedOrganizationUnits.forEach(function(item){
            orgArr.push(item.id)
        })
        this.form = {
            userName: result.user.userName,
            name: result.user.name,
            surname: result.user.surname,
            emailAddress: result.user.emailAddress,
            isActive: result.user.isActive,
            roleNames: result.user.roleNames,
            organizationUnitIDs: orgArr,
            id: result.user.id
        }
        this.checkedOrg = orgArr
        this.roleData = result.roles
        this.orgData = result.allOrganizationUnits
        //console.log(this.form.roleNames)
    }
    handleClose(done) {
        this.dialogVisible =false
    }
    async onSave(formName){
        let _self = this
        let params ={
            userName: _self.form.userName,
            name: _self.form.name,
            surname: _self.form.surname,
            emailAddress: _self.form.emailAddress,
            isActive: _self.form.isActive,
            roleNames: _self.form.roleNames,
            organizationUnitIDs: _self.form.organizationUnitIDs,
            password:_self.form.password
        }
        _self.saveUser(params)

    }
    async onSubmit(formName){
        let _self = this
        if(_self.isEdit){
            let params = {
                userName: _self.form.userName,
                name: _self.form.name,
                surname: _self.form.surname,
                emailAddress: _self.form.emailAddress,
                isActive: _self.form.isActive,
                roleNames: _self.form.roleNames,
                organizationUnitIDs:_self.form.organizationUnitIDs,
                id: _self.form.id
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.updateUser(params)
                } else {
                    _self.$message({
                        message: '表单数据验证失败',
                        type: 'error'
                    })
                    return false;
                }
            })

        }else {

        }

    }

    async updateUser(params){
        let data = await updateUser(params)
        if (data.result) {
            this.$message({
                message: '用户更新成功',
                type: 'success'
            })
            this.initData('')
            this.dialogVisible =false
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
    }

    async saveUser(params){
        let data = await saveUser(params)
        if (data.result) {
            this.$message({
                message: '用户新增成功',
                type: 'success'
            })
            this.initData('')
            this.dialogVisible = false
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
    }
    removeUser(row){
        let _self = this
        this.$confirm('此操作将删除该用户, 是否继续?', '用户删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _self.deleteOrgById(row.id)
            this.dialogVisible = false
        }).catch(() => {
        });
    }
    async deleteOrgById(id){
        let data = await deleteUser(id)
        if (data.success) {
            this.$message({
                message: '用户删除成功',
                type: 'success'
            })
            this.initData('')
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
    }
    //切换客户端
    async changeCilent(val){
        this.client = val
        if(this.client){
            let _self = this
            let data = await getUserPerm(this.curUser.id,val)
            this.permTreeData = data.result.permissions
            let result = []
            data.result.grantedPermissions.forEach(function(item){
                _self.getNodeByName(_self.permTreeData, item, result)
            })
            //显示已勾选的数据
            this.$refs.roleTree.initSelectedItems(result)
            let checkArr = []
            result.forEach(function(item){
                checkArr.push(item.id)
            })
            this.checkedPerm = checkArr
        }else{
            this.$refs.roleTree.initSelectedItems([])
            this.permTreeData = []
            this.checkedPerm =[]
        }

    }

    getNodeByName(data, curItem, result){
        let _self = this
        data.forEach(function(item){
            if(item.name == curItem.name && item.clientId == curItem.clientId){
                result.push(item)
                return false
            }
            if(item.children && item.children.length > 0){
                _self.getNodeByName(item.children, curItem, result)
            }
        })
    }

    async showPermModel(row){
        let _self = this
        this.permDialogVisible = true
        this.curUser = row
        if(this.clientList.length > 0){
            this.client = this.clientList[0].clientId
        }
        let data = await getUserPerm(row.id,this.client)
        this.permTreeData = data.result.permissions
        let result = []
        data.result.grantedPermissions.forEach(function(item){
            _self.getNodeByName(_self.permTreeData, item, result)
        })
        //显示已勾选的数据
        this.$refs.roleTree.initSelectedItems(result)
        let checkArr = []
        result.forEach(function(item){
            checkArr.push(item.id)
        })
        this.checkedPerm = checkArr
    }

    async onSelectedPermChanged(idItems){
        this.selectPermissions = idItems
    }

    setPermissionsArr(selectItem){
        let arrs = []
        selectItem.forEach(function (item) {
            let flag = false
            let index = -1
            let selectIndex = -1
            if(arrs.length == 0){
                arrs.push({clientId: item.clientId, permissionNames: [item.name]})
            }else{
                arrs.forEach(function(permissions){
                    index = index + 1
                    if(permissions.clientId == item.clientId){
                        flag = true
                        selectIndex = index
                    }

                })
                if(flag){
                    var permStr = arrs[selectIndex].permissionNames.join(',')
                    if(permStr.indexOf(item.name) == -1){
                        arrs[selectIndex].permissionNames.push(item.name)
                    }
                }else{
                    arrs.push({clientId: item.clientId, permissionNames: [item.name]})
                }
            }

        })
        return arrs
    }

    async updatePerm(){
        //let permArr = this.setPermissionsArr(this.selectPermissions)
        let permArr=[]
        this.selectPermissions.forEach(function(item){
            permArr.push(item.name)
        })
        //console.log(permArr)
        let params = {
            grantedPermissions: [{clientId: this.client, permissionNames: permArr}],
            id: this.curUser.id
        }
        let data = await updateUserPerm(params)
        if (data.success) {
            this.$message({
                message: '用户权限更新成功',
                type: 'success'
            })
            this.initData('')
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
    }
    handlePermClose(done) {
        this.permDialogVisible =false
    }
    onSelectedItemChanged(items){
        let orgArr =[]
        items.forEach(function(item){
            orgArr.push(item.id)
         })
        this.form.organizationUnitIDs = orgArr
    }

    handleClick(tab, event) {
        //console.log(tab, event);
    }

}