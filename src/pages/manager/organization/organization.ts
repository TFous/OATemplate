/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './organization.vue'
import { routers } from 'router'
const clone = require('clone')
import tree from './../../widgets/tree/tree'
import {getList, saveOrg, deleteOrg, updateOrg,addOrgUser, getOrgUserList,deleteOrgUser} from '../../../api-service/manager/organization.service'
import {getUserList} from '../../../api-service/manager/user.service'
@Component({
    name: 'organization',
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
        }/*,
        'curentPage': {
            handler: function (val, oldVal) {

                if (oldVal !== undefined) {
                    this.toggleSelection()
                }
            },
            deep: true
        }*/
    },
    components: {
        'tree': tree
    },
    mounted() {
        this.initData()
    }
})

export default class organization extends Vue {
    orgData: Array<object> =[]

    defaultProps:object = {
        children: 'children',
        label: 'label'
    }
    orgName:string ='组织成员'
    selectOrg: object = null
    dialogVisible:boolean = false
    orgTitle:string =''
    isEditOrg:boolean = false
    orgForm:object={
        id:null,
        parentName:null,
        parentId:null,
        displayName:null
    }
    userVisible:boolean = false
    userTitle:string =''

    multipleSelection:Array<object> =  []
    selectUsers:Array<object> =  []
    filterText:string = ''
    allTable: Array<object> = []
    tableData: Array<object> = []
    totalCount:number = 0
    curentPage:number = 1
    pageSize:number= 20
    pageSizes: Array<object> = [20,30,50]
    isEdit:boolean = false

    filterUser:string =''
    userTableData: Array<object> = []
    userallTable: Array<object> = []
    usertotalCount:number = 0
    usercurentPage:number = 1
    userpageSize:number= 20
    userpageSizes: Array<object> = [20,30,50]

    //获取组织树
    async initData(){
        let data = await getList()
        this.orgData = data.result
        this.$refs.orgRef.setFilterText()
        this.selectOrg = null

    }
    //根据关键词搜索组织
    querySearch(queryString, cb) {
        var orgData = this.orgData
        var results = queryString ? orgData.filter(this.createFilter(queryString)) : orgData
        // 调用 callback 返回建议列表的数据
        cb(results);
    }
    createFilter(queryString) {
        return (orgData) => {
            return (orgData.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    }
    //选中组织
    onNodeChanged(data) {
        this.selectOrg = data
        if(data){
            this.orgName = data.label
            this.getOrgUserList(data.id)
        }
    }
    //获取组织成员
    async getOrgUserList(id){
        let data = await getOrgUserList(id)
        let result = data.result.items //.reverse()
        this.usertotalCount = data.result.totalCount
        this.userallTable = data.result.items
        this.handleUserCurrentChange(this.usercurentPage)
    }
    //组织成员table每页展示数量改变
    handleUserSizeChange(val) {
        let totalPage = Math.ceil(this.usertotalCount/val)
        this.userpageSize = val
        if(this.usercurentPage < totalPage){
            let start = (this.usercurentPage - 1)*val
            let end = start + val
            this.userTableData = this.userallTable.slice(start, end)
        }else if(this.usercurentPage == totalPage){
            let start = (this.usercurentPage - 1)*val
            let end = this.usertotalCount
            this.userTableData = this.userallTable.slice(start, end)
        }else {
            this.userTableData = []
        }
    }
    //组织成员table页数改变
    handleUserCurrentChange(val) {
        let totalPage = Math.ceil(this.usertotalCount/this.userpageSize)
        this.usercurentPage = val
        if(val < totalPage){
            let start = (val - 1)*this.userpageSize
            let end = start + this.userpageSize
            this.userTableData = this.userallTable.slice(start, end)
        }else if(val == totalPage){
            let start = (val - 1)*this.userpageSize
            let end = this.usertotalCount
            this.userTableData = this.userallTable.slice(start, end)
        }else {
            this.userTableData = []
        }
    }
    //隐藏添加编辑组织model
    handleClose(done) {
        this.dialogVisible =false
    }
    //显示新增组织model
    showModel(){
        this.orgTitle = '新增组织'
        this.isEditOrg = false
        this.dialogVisible = true
        if(this.selectOrg){
            this.orgForm = {
                parentName:this.selectOrg.displayName,
                parentId:this.selectOrg.id,
                displayName:null
            }
        }else{
            this.orgForm = {
                parentName:null,
                parentId:null,
                displayName:null
            }
        }
    }
    //显示编辑组织model
    showEditModel(){
        if(this.selectOrg) {
            this.orgTitle = '编辑组织'
            this.isEditOrg = true
            this.dialogVisible = true
            this.clearParentOrg()
            this.getParentOrg(this.orgData)
            this.orgForm.id = this.selectOrg.id
            this.orgForm.displayName = this.selectOrg.label
        }else{
            this.$message({
                message: '请先选择组织',
                type: 'warning'
            })
        }

    }
    //清空组织
    clearParentOrg(){
        this.orgForm.parentId = null
        this.orgForm.parentName = null
    }
    //获取上级组织
    getParentOrg(data){
        let _self = this
        data.forEach(function(item){
            if(item.id == _self.selectOrg.parentId){
                _self.orgForm.parentId= item.id
                _self.orgForm.parentName = item.label
            }
            if(item.children && item.children.length > 0){
                _self.getParentOrg(item.children)
            }
        })
    }
    //保存or更新组织
    async submitOrg(){
        if(this.isEditOrg){
            let params = {
                id: this.orgForm.id,
                displayName: this.orgForm.displayName
            }
            let data = await updateOrg(params)
            if (data.result) {
                this.$message({
                    message: '组织更新成功',
                    type: 'success'
                })
                this.initData()
                this.dialogVisible =false
            } else {
                this.$message({
                    showClose: true,
                    message: data.error.message,
                    type: 'error'
                })
            }
        }else {
            let params = {
                parentId: this.orgForm.parentId,
                displayName: this.orgForm.displayName
            }
            let data = await saveOrg(params)
            if (data.result) {
                this.$message({
                    message: '组织新增成功',
                    type: 'success'
                })
                this.initData()
                this.dialogVisible =false
            } else {
                this.$message({
                    message: data.error.message,
                    type: 'error'
                })
            }
        }
    }

    //删除组织
    deleteOrg(){
        if(this.selectOrg) {
            let _self = this
            this.$confirm('此操作将删除"'+this.selectOrg.label+'", 是否继续?', '组织删除确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.deleteOrgById(_self.selectOrg.id)
                this.dialogVisible =false
            }).catch(() => {
            });
        }else{
            this.$message({
                showClose: true,
                message: '请先选择组织',
                type: 'warning'
            })
        }
    }
    async deleteOrgById(id){
        let data = await deleteOrg(id)
        if (data.success) {
            this.$message({
                message: '组织删除成功',
                type: 'success'
            })
            this.initData()
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
        this.initData()
    }

    //删除组织成员
    removeOrgUser(row) { // 删除组织用户
        let _self = this
        this.$confirm('此操作将删除组织成员"'+row.fullName+'", 是否继续?', '组织成员删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
                _self.deleteOrgUserById(row.id,_self.selectOrg.id)

        }).catch(() => {
        });

    }
    async deleteOrgUserById(userId,orgId){
        let data = await deleteOrgUser(userId,orgId)
        if (data.success) {
            this.$message({
                message: '组织成员删除成功',
                type: 'success'
            })
            this.getOrgUserList(this.selectOrg.id)
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
    }


    async showUserModel(){
        this.userVisible = true
        this.userTitle = '添加 - 用户'
        //this.getUserList('')
        this.selectUsers = []
        this.multipleSelection = []
        let data = await getUserList(name)
        let result = data.result.items
        this.allTable = result
        if(this.allTable){
            this.totalCount = data.result.totalCount
        }else{
            this.totalCount = 0
        }
        this.handleCurrentChange(this.curentPage)
        let selectArr =[]
        let _self = this
        this.allTable.forEach(function(item){
            _self.userallTable.forEach(function(uitem) {
                if(item.id == uitem.id){
                    selectArr.push(item)
                }
            })
        })
        this.toggleSelection(selectArr)
    }

    toggleSelection(rows) {
        /*let rows = []
         let _self = this
         this.selectUsers.forEach(function(item){
         if(item.page == _self.curentPage){
         rows = item.list
         }
         })*/
        if (rows) {
            rows.forEach(row => {
                this.$refs.userTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.userTable.clearSelection();
        }
    }
    async getUserList(name){
        let data = await getUserList(name)
        let result = data.result.items
        this.allTable = result
        if(this.allTable){
            this.totalCount = data.result.totalCount
        }else{
            this.totalCount = 0
        }
        this.handleCurrentChange(this.curentPage)
    }

    searchUser(){
        this.getUserList(this.filterUser)
    }
    async submitUser(){
        let userIds = []
        this.multipleSelection.forEach(function(item){
            userIds.push(item.id)
        })
        let params ={
            organizationUnitId: this.selectOrg.id,
            userIds: userIds
        }
        let data = await addOrgUser(params)
        if (data.success) {
            this.$message({
                message: '用户添加成功',
                type: 'success'
            })
            this.getOrgUserList(this.selectOrg.id)
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
        //console.log(this.multipleSelection)

    }
    //选中用户
    handleSelectionChange(val) {
        //当前页选中数据
        this.multipleSelection = val
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

    handleUserClose(){
        this.userVisible = false
    }

}