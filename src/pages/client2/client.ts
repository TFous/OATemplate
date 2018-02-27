/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import {Component} from 'vue-property-decorator'
import template from './client.vue'


const clone = require('clone')
import Vue from 'vue'
import Component from 'vue-class-component'
import {deleteSecondSeat,deleteClient} from '../../api-service/client.service'
import {baseRole} from '../../config/role-map.js'

const validateClientNo = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入客户号！'));
    } else {
        var reg=/^\d{6}$/;
        if(!reg.test(value)){
            callback("请输入六位数字的客户号");
        }
        callback();
    }
}
const validateBank = (rule, value, callback) => {
    if (value != null) {
        if((value).toString().length > 15){
            callback(new Error('请输入15位以内的数字！'));
        }
        callback();
    } else {
        callback();

    }
}
@Component({
	name: 'client',
	mixins: [template],
    watch: {
        //设置权限
        'getClientUserInfo':{
            handler: function (val, oldVal) {
                if (oldVal !== undefined) {

                    this.setAuth(val)
                }
            },
            deep: true
        },
        'getState.initTableData': {
            handler: function (val, oldVal) {

                if (oldVal !== undefined) {
                    this.setFilters()
                    this.setTableData(val)
                }
            },
            deep: true
        },

        'clientVisible':{
            handler: function (val, oldVal) {
                if (oldVal !== undefined) {
                    if(val == false){
                        this.handleReset('clientForm')
                    }
                }
            },
            deep: true
        },
        'viewClientVisible':{
            handler: function (val, oldVal) {
                if (oldVal !== undefined) {
                    if(val == false){
                        this.handleReset('viewClientForm')
                    }
                }
            },
            deep: true
        },
        'getState.refresh': {
            handler: function (val, oldVal) {
                if (oldVal !== undefined && oldVal !== val) {
                    this.clearValFn()
                }
            },
            deep: true
        }
    },
    mounted() {

    }
})


export default class client extends Vue{
    showErrorInfo:boolean= false
    getAuth:boolean= false//浏览次席信息权限
    addAuth:boolean= false //添加次席权限
    editAuth:boolean= false //编辑次席权限
    deleteAuth:boolean= false
    addShow: boolean = false
    clientVisible: boolean = false
    viewClientVisible: boolean = false
    remoteListAll:any = {}
    value1:any=[]
    value2:any=[]
    //高级搜索
    isShowSenior:boolean = true // 高级搜索是否显示
    //次席系统字典和次席系统状态字典
    SecondSeatSystemDict:Array<object> = []
    SecondSeatStatusDict:Array<object> = []
    viewTitle:string = ''//查看 - 次席信息
    btnText:string = '修改'
    isView:boolean = false
    isDelete:boolean = false
    //新增表单
    clientForm: object = {
            ClientNo: null,
            DoubleOpen: null,
            CommodityOption: null,
            FinancialOption: null,
            BankingfuturesWholesale: null,
            ClientSecondSeat: [{
                SecondSeat: null,
                SecondSeatStatus:null,
                OpenTime:null,
                CloseTime:null
            }],
            Note:null
    }
    //编辑表单
    viewClientForm: object = {
        ClientId: null,
        ClientNo: null,
        DoubleOpen: null,
        CommodityOption: null,
        FinancialOption: null,
        BankingfuturesWholesale: null,
        ClientSecondSeat: [{
            Id: null,
            SecondSeat: null,
            SecondSeatStatus:null,
            OpenTime:null,
            CloseTime:null
        }],
        Note:null,
        Description:null
        /*Id:null,
        SecondSeat: null,
        SecondSeatStatus:null,
        OpenTime:null,
        CloseTime:null,
        Note:null,
        Description:null*/
    }

    //新增页面验证
    clientRules: object =  {
        ClientNo: [
          //{ required: true, message: '请输入六位数字的客户号', trigger: 'blur' },
          //{ min: 6, max: 6, message: '请输入六位数字的客户号', trigger: 'blur' },
             { validator: validateClientNo, trigger: 'blur' }
        ],
        DoubleOpen: [{ required: true, message: '必选', trigger: 'blur' }],
        BankingfuturesWholesale: [{ validator: validateBank, message: '请输入15位以内的数字', trigger: 'blur' }],
        Note: [{ max: 50, message: '请输入50位以内的字符', trigger: 'blur' }],
        Description: [{ max: 20, message: '请输入20位以内的字符', trigger: 'blur' }]
    }

    get getClientUserInfo(){
        return this.$store.getters['auth/user']
    }
    setAuth(auth){
        let _self = this
        if(auth.profile.role.indexOf('superAdmin') !== -1){
            this.getAuth = true
            this.addAuth = true
            this.editAuth = true
            this.deleteAuth = true
        }else {
            if (auth.profile.role.indexOf(baseRole.ClientGet) !== -1) {
                this.getAuth = true
            } else {
                this.getAuth = false
                this.showErrorInfo = true
            }
            //console.log(this.getAuth)
            if (auth.profile.role.indexOf(baseRole.ClientAdd) !== -1) {
                this.addAuth = true
            } else {
                this.addAuth = false
            }
            if (auth.profile.role.indexOf(baseRole.ClientEdit) !== -1) {
                this.editAuth = true
            } else {
                this.editAuth = false
            }
            if (auth.profile.role.indexOf(baseRole.ClientDelete) !== -1) {
                this.deleteAuth = true
            } else {
                this.deleteAuth = false
            }
        }
        let table = clone(this.options.table)
        table.forEach(function (item) {
            //console.log(item.render)
            /*if(item.key === 'action'){
             item.render.forEach(function(tag){
             console.log(tag)
             if(tag.text == '编辑'  && _self.editAuth == false){
             item.render.splice(tag)
             }
             })
             }*/
            if(item.key === 'action'){
                item.render.forEach(function(tag){
                    if(tag.text == '删除' && _self.deleteAuth == false){
                        item.render.splice(tag)
                    }
                })
            }
        })
        this.$store.dispatch(this.options.gridKey + 'setData', {table:table})
    }

    //次席信息管理表格数据
    data() {
        return {
            options: Object.assign({}, Vue.prototype.$xvuex.options, {
                border:false,
                url: Vue.prototype.$baseUrl.imss + 'Client',
                delUrl: Vue.prototype.$baseUrl.imss + 'Client',
                addUrl: Vue.prototype.$baseUrl.imss + 'Client/IMSS.CreateClient',
                editUrl: Vue.prototype.$baseUrl.imss + 'Client',
                updateUrl: Vue.prototype.$baseUrl.imss + 'Client/IMSS.UpdateClient',
                urlParameter: {
                    $filter: '',
                    $orderby: 'CreationTime desc',
                    $expand: 'ClientSecondSeat'
                },
                dicUrls: {
                  SecondSeatSystemDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary`,
                  SecondSeatStatusDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary`
                },
                title: '次席系统',  // 本页面名称
                gridKey: 'client',  // 本页面 Eng名，唯一
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
                        key: 'ClientNo',
                        title: '客户号',
                        fixed: 'left',
                        readOnly:true
                        ,render: [
                            {
                                title: '点击查看次席信息详情',
                                fn: this.editRow,
                            }
                        ]
                    },
                    {
                        key: 'TotalSecondSeatStatus',
                        title: '总次席状态',
                        dicKey: 'SecondSeatStatusDict',
                        type: 'select',
                        filter: true,
                        filters: [],
                        searchKey: 'hide',
                        readOnly:true,
                        fixed: 'left'
                    },
                    {
                        key: 'SecondSeat',
                        title: '次席系统',
                        width: 120,
                        dicKey: 'SecondSeatSystemDict',
                        type: 'select',
                        addLayer: 'hide',   // 新增页面是否显示：show  hide,默认show
                        editLayer: 'hide', // 编辑页面 是否显示：show  hide,默认show
                        searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                        detailsLayer: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                        column: 'hide',  // 列表 是否显示：show  hide,默认show
                        filter: true,
                        isExpand: true,
                        filters: [],
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'SecondSeatStatus',
                        title: '次席状态',
                        width: 120,
                        dicKey: 'SecondSeatStatusDict',
                        type: 'select',
                        addLayer: 'hide',   // 新增页面是否显示：show  hide,默认show
                        editLayer: 'hide', // 编辑页面 是否显示：show  hide,默认show
                        searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                        detailsLayer: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                        column: 'hide',  // 列表 是否显示：show  hide,默认show
                        filter: true,
                        isExpand: true,
                        filters: [],
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'MultiSecondSeat',
                        title: '多次席',
                        searchKey: 'hide',
                        type: 'select',
                        selects: [{value:true,text:'是'},{value:false,text:'否'}],
                        readOnly:true
                    },
                    {
                        key: 'DoubleOpen',
                        title: '双开客户',
                        searchKey: 'hide',
                        selects: [{value:true,text:'是'},{value:false,text:'否'}],
                        type: 'select',
                        filter: true,
                        filters: [{value:`(DoubleOpen eq true)`,text:'是'},{value:`(DoubleOpen eq false)`,text:'否'}],
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'BankingfuturesWholesale',
                        title: '银期大额',
                        type:'number'
                    },
                    {
                        key: 'CommodityOption',
                        title: '商品期权',
                        dicKey: 'SPQQDict',
                        searchKey: 'show',
                        selects: [{value:true,text:'正常'},{value:false,text:' '}],
                        filter: true,
                        filters: [{value:`(CommodityOption eq true)`,text:'正常'},{value:`(CommodityOption eq false)`,text:''}],
                        type: 'select'
                    },
                    {
                        key: 'FinancialOption',
                        title: '金融期权',
                        dicKey: 'JRQQDict',
                        searchKey: 'show',
                        selects: [{value:true,text:'正常'},{value:false,text:' '}],
                        filter: true,
                        filters: [{value:`(FinancialOption eq true)`,text:'正常'},{value:`(FinancialOption eq false)`,text:''}],
                        type: 'select'
                    },
                    {
                        key: 'Note',
                        title: '备注',
                        column: 'hide',
                        searchKey: 'hide'
                    },
                    {
                        key: 'action',
                        title: '操作',
                        width: 160,
                        addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                        editLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                        searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                        fixed: 'right',
                        render: [
                            /*{
                                fn: this.editRow,
                                type: 'primary',
                                tag: 'button',
                                text: '编辑'
                            } ,*/
                            {
                                fn: this.deleteRow,
                                tag: 'button',
                                type: 'danger',
                                text: '删除'
                            }
                        ]
                    }
                ]
            })

        }
    }



    toggleRowExpansion(){
        let toggleRowExpansionType = this.getState.toggleRowExpansion
        this.$store.dispatch(this.options.gridKey + 'setData', {toggleRowExpansion:!toggleRowExpansionType})
    }
    clearValFn(){
        this.value1 = []
        this.value2 = []
    }
    /**
     *  设置筛选项内容
     */
    setFilters() {
        let _this = this
        let table = clone(this.getState.table)
        table.forEach(function (item) {
            if (item.filter === true && _this.$store.state[item.dicKey]) {
                let filters = []
                let selects = []
                let dicData = _this.$store.state[item.dicKey].data.value
                if(dicData.length>0){
                    dicData[0].DataDictionary.forEach(function (dicItem) {
                        //筛选
                        let filterItem: any = {}
                        filterItem.text = dicItem.Name
                        filterItem.value = `(${item.key} eq ${dicItem.Id})`
                        filters.push(filterItem)
                        //修改新增
                        let selectItem: any = {}
                        selectItem.text = dicItem.Name
                        selectItem.value = dicItem.Id
                        selects.push(selectItem)
                    })
                    item['filters'] = filters
                    item['selects'] = selects
                    _this.remoteListAll[item.key] = filters
                }
            }
        })
        _this.$store.dispatch(_this.options.gridKey + 'setData', {table: table})
    }

    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    setTableData(tableData) {
        let _self = this
        let initData = clone(tableData)
        let SecondSeatSystemDict = ''
        let SecondSeatStatusDict = ''
        if(this.$store.state.SecondSeatSystemDict.data){
            SecondSeatSystemDict = this.$store.state.SecondSeatSystemDict.data.value
            if(SecondSeatSystemDict.length>0){
                _self.SecondSeatSystemDict = SecondSeatSystemDict[0].DataDictionary
            }
        }
        if(this.$store.state.SecondSeatStatusDict.data){
            SecondSeatStatusDict = this.$store.state.SecondSeatStatusDict.data.value
            if(SecondSeatStatusDict.length>0){
                _self.SecondSeatStatusDict = SecondSeatStatusDict[0].DataDictionary
            }
        }
        let editData = []
        initData.forEach(function (item,index) {
            // let ClientSecondSeatLength = item.ClientSecondSeat.length
            // if(ClientSecondSeatLength===0){
            //     return
            // }
            //设置总次席系统状态
            if(SecondSeatStatusDict.length>0){
                SecondSeatStatusDict[0].DataDictionary.forEach(function (dicItem) {
                    if (dicItem.Id === item.TotalSecondSeatStatus) {
                        item.TotalSecondSeatStatus = dicItem.Name
                    }
                })
            }
            if(item.MultiSecondSeat == true){
                item.MultiSecondSeat = '是'
            }else if(item.MultiSecondSeat == false){
                item.MultiSecondSeat = '否'
            }
            item.DoubleOpen = item.DoubleOpen == true ? '是': '否'
            item.CommodityOption = item.CommodityOption == true ? '正常': ''
            item.FinancialOption = item.FinancialOption == true ? '正常': ''
            item.ClientSecondSeat.forEach(function (val) {
                val.CloseTime = (val.CloseTime != null?val.CloseTime.substring(0,10):null)
                val.OpenTime = (val.OpenTime != null?val.OpenTime.substring(0,10):null)
                //设置次席系统
                if(SecondSeatSystemDict.length>0){
                    _self.SecondSeatSystemDict = SecondSeatSystemDict[0].DataDictionary
                    SecondSeatSystemDict[0].DataDictionary.forEach(function (dicItem) {
                        if (dicItem.Id === val.SecondSeat) {
                            val.SecondSeat = dicItem.Name
                        }
                    })
                }
                //设置次席系统状态
                if(SecondSeatStatusDict.length>0){
                    SecondSeatStatusDict[0].DataDictionary.forEach(function (dicItem) {
                        if (dicItem.Id === val.SecondSeatStatus) {
                            val.SecondSeatStatus = dicItem.Name
                        }
                    })
                }
            })
            editData.push(item)
        })
        this.$store.dispatch(this.options.gridKey + 'setData', {tableData: editData})
    }

    selectChange1 (val) {
        if(val===true){
            return false
        }
        let _this = this
        let searchBtn = _this.getState.searchBtn
        _this.$store.dispatch(_this.options.gridKey + '_set_efilterbox', {SecondSeat: this.value1})
        _this.$store.dispatch(_this.options.gridKey + 'setData', {searchBtn: !searchBtn})
    }
    selectChange2 (val) {
        if(val===true){
            return false
        }
        let _this = this
        let searchBtn = _this.getState.searchBtn
        _this.$store.dispatch(_this.options.gridKey + '_set_efilterbox', {SecondSeatStatus: this.value2})
        _this.$store.dispatch(_this.options.gridKey + 'setData', {searchBtn: !searchBtn})
    }
    //展示新增Model
    showClientModel(){
        this.clientVisible = true
        this.clientForm = {
            ClientNo: null,
            DoubleOpen: null,
            CommodityOption: null,
            FinancialOption: null,
            BankingfuturesWholesale: null,
            ClientSecondSeat: [{
                SecondSeat: null,
                SecondSeatStatus:null,
                OpenTime:null,
                CloseTime:null
            }],
            Note:null
        }
        if(this.$store.state.SecondSeatSystemDict.data.value.length > 0){
            this.SecondSeatSystemDict = this.$store.state.SecondSeatSystemDict.data.value[0].DataDictionary
        }
        if(this.$store.state.SecondSeatStatusDict.data.value.length > 0){
            this.SecondSeatStatusDict = this.$store.state.SecondSeatStatusDict.data.value[0].DataDictionary
        }
    }

    handleReset(name) {
        this.$refs[name].resetFields()
    }

    async viewDetailClose(){
        this.viewClientVisible = false
    }
    /*showViewDetail(scope){
        let data = clone(scope.row)
        data.DoubleOpen = data.DoubleOpen == '是'? 'true':'false'
        data.CommodityOption = data.CommodityOption == '正常'? true:false
        data.FinancialOption = data.FinancialOption == '正常'? true:false
        this.viewClientForm = data
        this.viewClientVisible = true
        this.isView = true
        this.viewTitle = '查看 - 次席信息'
    }*/

    /*async deleteRow(scope) {
        let _this = this
        this.$confirm('此操作将删除该项, 是否继续?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let id = scope.row.Id
            let url = _this.getState.delUrl+ '('+id+')'
            let requestDataHeader = Vue.prototype.$api.request(url, {
                method: 'DELETE'
            })
            fetch(requestDataHeader).then(resp => {
                if (resp.ok === true) {
                    _this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                    _this.$store.dispatch(_this.options.gridKey + '_set_refresh')
                } else {
                    return resp.json()
                }
            }).then(data => {
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // })
            })
        }).catch(() => {

        })
    }*/

    headerFn() {
        return {
            // 批量删除
            /*batchDel() {
                let _this = this
                let delObjs = _this.getState.selection
                let $length = delObjs.length
                if ($length === 0) {
                  this.$message({
                    message: '请先选中需要删除的项目。',
                    type: 'warning'
                  })
                  return false
                }
                this.$confirm('此操作将删除选中项, 是否继续?', '批量删除确认', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  let myRequests = []
                  delObjs.forEach(function (item) {
                    let url = _this.getState.delUrl+ '('+item.Id+')'
                        myRequests.push(Vue.prototype.$api.request(url, {method: 'DELETE'}))
                  })
                  Promise.all(myRequests.map(myRequest =>
                    fetch(myRequest).then(resp => {
                        if (resp.ok === true) {
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            _this.$store.dispatch(_this.options.gridKey + '_set_refresh')
                            //删除最后一页 bug
                            let pagerCurrentPage = _this.getState.pager_CurrentPage
                            let pageSize = _this.getState.pager_Size
                            let pagerTotal = _this.getState.pager_Total
                            if (pagerCurrentPage > 1 && pagerTotal % pageSize === $length) {
                              _this.$store.dispatch(_this.getState.gridKey + 'setData', {pager_CurrentPage: pagerCurrentPage - 1})
                            }
                            _this.$store.dispatch(_this.getState.gridKey + 'setData', {selection: []})
                        } else {
                            //isRequestOk = resp.ok
                            return resp.json()
                        }
                    })
                  ))
                }).catch(() => {

                })
            }*/
        }
    }

    tableFn() {
        return {}
    }

    addFn() {
        return {}
    }
    editFn() {
        return {}
    }

    get getState() {
        return this.$store.state[this.options.gridKey]
    }

    async handleClose(done) {
        this.dialogVisible = false
        //this.$confirm('确认关闭？')
        //  .then(_ => {
        //    done();
        //  })
        //  .catch(_ => {});
    }
    /**
     * =============================================
     * 新增页面
     * */
    //添加次席
    async  addSecondSeats() {

        this.clientForm.ClientSecondSeat.push({
            value: '',
            key: Date.now()
        });
    }
    //删除次席
    async removeSecondSeats(item) {

        let index = this.clientForm.ClientSecondSeat.indexOf(item)
        let ClientSecondSeat = clone(this.clientForm.ClientSecondSeat)
        if (index !== -1) {
            ClientSecondSeat.splice(index, 1)
            this.clientForm.ClientSecondSeat = ClientSecondSeat
        }

       /* let data = clone( this.clientForm)
        let index = data.ClientSecondSeat.indexOf(item)

        if (index !== -1) {
            data.ClientSecondSeat.splice(index, 1)
            await deleteSecondSeat(item.Id)
            this.clientForm = data
            this.$store.dispatch(this.options.gridKey + '_set_refresh')
        }*/
    }
    /**
     * 保存次席信息
     * */
    async handleSubmit(formName) {
        let _self = this
        let clientForm = _self.clientForm
        let clientSecondSeat = _self.clientForm.ClientSecondSeat
        let secondSeatDto = []
        let clientDto = {
            ClientNo: clientForm.ClientNo,
            DoubleOpen: clientForm.DoubleOpen,
            BankingfuturesWholesale: clientForm.BankingfuturesWholesale ? Number(clientForm.BankingfuturesWholesale) : null,
            CommodityOption: clientForm.CommodityOption ? clientForm.CommodityOption : false,
            FinancialOption: clientForm.FinancialOption ? clientForm.FinancialOption : false,
            Note: clientForm.Note
        }
        if(clientSecondSeat.length > 0){
            clientSecondSeat.forEach(function (item) {
                var secondSeat = {
                    SecondSeat: item.SecondSeat,
                    SecondSeatStatus: item.SecondSeatStatus,
                    OpenTime: item.OpenTime?item.OpenTime:null,
                    CloseTime: item.CloseTime?item.CloseTime:null
                }
                secondSeatDto.push(secondSeat)
            })
        }
        let datas ={
            ClientDto: clientDto,
            SecondSeatDto: secondSeatDto
        }
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let url = _self.getState.addUrl
                let requestDataHeader = Vue.prototype.$api.request(url, {
                    method: 'POST',
                    body: JSON.stringify(datas)
                })
                fetch(requestDataHeader).then(resp => {
                    if (resp.ok === true) {
                        _self.clientVisible = false
                        _self.$message({
                            showClose: true,
                            message: '新增成功',
                            type: 'success'
                        })
                        //_self.$store.dispatch(_self.options.gridKey + 'setData', {addSucess: data})
                        let requestUrl = clone(_self.getState.requestUrl)
                        if (requestUrl.indexOf('?$') !== -1) {
                            _self.$store.dispatch(_self.options.gridKey + 'setData', {requestUrl: requestUrl + '&' + Math.random()})
                        } else {
                            _self.$store.dispatch(_self.options.gridKey + 'setData', {requestUrl: requestUrl + '?' + Math.random()})
                        }
                        //_self.$store.dispatch(_self.options.gridKey + '_set_refresh')
                        //_self.$store.dispatch(_self.options.gridKey + '_set_refresh')
                        _self.show = false // 关闭弹窗
                    } else {
                        return resp.json()
                    }
                }).then(data => {
                    if(data){
                        _self.$message({
                            showClose: true,
                            message: data.message,
                            type: 'error'
                        })
                        return false;
                    }
                })
            } else {
                _self.$message({
                    showClose: true,
                    message: '表单数据验证失败！',
                    type: 'primary'
                })
                return false;
            }
        })

    }

    /**
     * =============================================
     * 编辑页面
     * */

    /**
     *  设置显示修改弹窗数据
     * */
    editRow(scope) {
        //if(this.editAuth == true){
            let _self = this
            let select = scope.row
            if (select) {
                _self.viewClientVisible = true
                _self.isDelete = false
                if(this.editAuth == true){
                    _self.viewTitle = '编辑 - 次席信息'
                }else{
                    _self.viewTitle = '查看 - 次席信息'
                }

                if (this.editAuth == true) { //没有编辑权限 则只能查看
                    _self.isView = false
                } else {
                    _self.isView = true
                }
                this.getState.initTableData.forEach(function (item) {
                    if (select.Id === item.Id) {
                        let data = clone(item)
                        _self.viewClientForm = {
                            ClientId: data.Id,
                            ClientNo: data.ClientNo,
                            DoubleOpen: data.DoubleOpen,
                            CommodityOption: data.CommodityOption,
                            FinancialOption: data.FinancialOption,
                            BankingfuturesWholesale: data.BankingfuturesWholesale,
                            ClientSecondSeat: data.ClientSecondSeat,
                            Note: data.Note,
                            Description: null
                        }
                    }
                })
            }
     /*   }
    else {
            this.$message({
                showClose: true,
                message: '无次席编辑权限！',
                type: 'error'
            })
        }*/


    }

    //添加次席
    async  updateSecondSeats() {
        let data =clone(this.viewClientForm.ClientSecondSeat)
        data.push({
            value: '',
            key: Date.now()
        });
        this.viewClientForm.ClientSecondSeat = data
    }
    //删除页删除次席
    removeSS(item){
        let index = this.viewClientForm.ClientSecondSeat.indexOf(item)
        let ClientSecondSeat = clone(this.viewClientForm.ClientSecondSeat)
        if (index !== -1) {
            ClientSecondSeat.splice(index, 1)
            this.viewClientForm.ClientSecondSeat = ClientSecondSeat
        }
    }

    /**
     * 更新次席信息
     * */
    async updateForm(formName) {
        let _self = this
        let data = clone(this.viewClientForm)
        let flag = false
        let clientDto = {
            Id: data.ClientId,
            DoubleOpen: data.DoubleOpen,
            BankingfuturesWholesale:data.BankingfuturesWholesale ? Number(data.BankingfuturesWholesale):null,
            CommodityOption: data.CommodityOption,
            FinancialOption: data.FinancialOption,
            Note:data.Note,
            Description: data.Description
        }
        let seatDto = []
        let addSeatDto = []
        data.ClientSecondSeat.forEach(function(item){
            if(item.Id){
                var seatDtoItem = {
                    CurrentSecondSeat: item.Id,
                    SecondSeat: item.SecondSeat,
                    SecondSeatStatus: item.SecondSeatStatus,
                    OpenTime: item.OpenTime,
                    CloseTime: item.CloseTime
                }
                seatDto.push(seatDtoItem)
            }else{
                var secondSeat = {
                    SecondSeat: item.SecondSeat,
                    SecondSeatStatus: item.SecondSeatStatus,
                    OpenTime: item.OpenTime?item.OpenTime:null,
                    CloseTime: item.CloseTime?item.CloseTime:null
                }
                addSeatDto.push(secondSeat)

            }

        })
        let dto = {
            ClientDto: clientDto,
            SeatDto: seatDto
        }
        if(seatDto.length > 0) {
            //更新客户信息
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = _self.getState.updateUrl
                    let requestDataHeader = Vue.prototype.$api.request(url, {
                        method: 'POST',
                        body: JSON.stringify(dto)
                    })
                    fetch(requestDataHeader).then(resp => {

                        if (resp.ok === true) {
                            flag = true
                            //新增次席
                            if (addSeatDto.length > 0) {
                                let clientDto = {
                                    ClientNo: data.ClientNo,
                                    DoubleOpen: data.DoubleOpen,
                                    BankingfuturesWholesale: data.BankingfuturesWholesale ? Number(data.BankingfuturesWholesale) : null,
                                    CommodityOption: data.CommodityOption ? data.CommodityOption : false,
                                    FinancialOption: data.FinancialOption ? data.FinancialOption : false,
                                    Note: data.Note
                                }
                                let addDatas = {
                                    ClientDto: clientDto,
                                    SecondSeatDto: addSeatDto
                                }
                                let url = _self.getState.addUrl
                                let requestDataHeader = Vue.prototype.$api.request(url, {
                                    method: 'POST',
                                    body: JSON.stringify(addDatas)
                                })
                                fetch(requestDataHeader).then(resp => {
                                    if (resp.ok === true && flag) {
                                        _self.$message({
                                            showClose: true,
                                            message: '更新成功',
                                            type: 'success'
                                        })
                                        _self.viewClientVisible = false // 关闭弹窗
                                        /*_self.clientVisible = false
                                         _self.$message({
                                         showClose: true,
                                         message: '新增成功',
                                         type: 'success'
                                         })
                                         _self.$store.dispatch(_self.options.gridKey + '_set_refresh')
                                         _self.show = false // 关闭弹窗*/
                                    } else {
                                        return resp.json()
                                    }
                                }).then(data => {
                                    if (data) {
                                        _self.$message({
                                            showClose: true,
                                            message: data.message,
                                            type: 'error'
                                        })
                                        return false;
                                    }
                                })

                            } else {
                                if (flag) {
                                    _self.$message({
                                        showClose: true,
                                        message: '更新成功',
                                        type: 'success'
                                    })
                                    _self.viewClientVisible = false // 关闭弹窗
                                }

                            }

                            let requestUrl = clone(_self.getState.requestUrl)
                            if (requestUrl.indexOf('?$') !== -1) {
                                _self.$store.dispatch(_self.options.gridKey + 'setData', {requestUrl: requestUrl + '&' + Math.random()})
                            } else {
                                _self.$store.dispatch(_self.options.gridKey + 'setData', {requestUrl: requestUrl + '?' + Math.random()})
                            }

                        } else {
                            return resp.json()
                        }
                    }).then(data => {
                        if (data) {
                            _self.$message({
                                showClose: true,
                                message: data.message,
                                type: 'error'
                            })
                            return false;
                        }
                    })


                } else {
                    _self.$message({
                        showClose: true,
                        message: '表单数据验证失败！',
                        type: 'primary'
                    })
                    return false;
                }

            })
        }else{//不更新只新增
            //新增次席
            if (addSeatDto.length > 0) {
                let clientDto = {
                    ClientNo: data.ClientNo,
                    DoubleOpen: data.DoubleOpen,
                    BankingfuturesWholesale: data.BankingfuturesWholesale ? Number(data.BankingfuturesWholesale) : null,
                    CommodityOption: data.CommodityOption ? data.CommodityOption : false,
                    FinancialOption: data.FinancialOption ? data.FinancialOption : false,
                    Note: data.Note
                }
                let addDatas = {
                    ClientDto: clientDto,
                    SecondSeatDto: addSeatDto
                }
                let url = _self.getState.addUrl
                let requestDataHeader = Vue.prototype.$api.request(url, {
                    method: 'POST',
                    body: JSON.stringify(addDatas)
                })
                fetch(requestDataHeader).then(resp => {
                    if (resp.ok === true) {
                        _self.$message({
                            showClose: true,
                            message: '更新成功',
                            type: 'success'
                        })
                        _self.viewClientVisible = false // 关闭弹窗
                    } else {
                        return resp.json()
                    }
                }).then(data => {
                    if (data) {
                        _self.$message({
                            showClose: true,
                            message: data.message,
                            type: 'error'
                        })
                        return false;
                    }
                })

            } else {
                if (flag) {
                    _self.$message({
                        showClose: true,
                        message: '更新成功',
                        type: 'success'
                    })
                    _self.viewClientVisible = false // 关闭弹窗
                }

            }
            this.viewClientForm = []
            let requestUrl = clone(_self.getState.requestUrl)
            //_self.$store.dispatch(_self.options.gridKey + '_set_refresh')
            if (requestUrl.indexOf('?$') !== -1) {
                _self.$store.dispatch(_self.options.gridKey + 'setData', {requestUrl: requestUrl + '&' + Math.random()})
            } else {
                _self.$store.dispatch(_self.options.gridKey + 'setData', {requestUrl: requestUrl + '?' + Math.random()})
            }
        }


    }

    detailClose(){
        this.clientVisible = false
    }

    /**
     * =====================================
     * 删除页面
     * */
    //显示删除页面
    deleteRow(scope) {
        let _self = this
        let select = scope.row
        if (select) {
            _self.viewClientVisible = true
            _self.isDelete = true
            _self.isView = true
            _self.viewTitle = '删除 - 次席信息'
            this.getState.initTableData.forEach(function (data) {
                if(select.Id=== data.Id){
                    _self.viewClientForm = {
                        ClientId: data.Id,
                        ClientNo: data.ClientNo,
                        DoubleOpen: data.DoubleOpen,
                        CommodityOption: data.CommodityOption,
                        FinancialOption:  data.FinancialOption,
                        BankingfuturesWholesale: data.BankingfuturesWholesale,
                        ClientSecondSeat: data.ClientSecondSeat,
                        Note:data.Note,
                        Description:null
                    }
                }
            })
        }

    }



    //删除编辑页面次席
    async deleteSecondSeats(item) {

        let _self = this
        this.$confirm('此操作将删除该次席信息, 是否继续?', '次席删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _self.deleteByItem(item)

            if(_self.viewClientForm.ClientSecondSeat.length == 0){
                _self.viewClientVisible = false
            }
        }).catch(() => {
        });

    }

    async deleteByItem(item){
        let _self = this
        let index = this.viewClientForm.ClientSecondSeat.indexOf(item)
        let ClientSecondSeat = clone(this.viewClientForm.ClientSecondSeat)
        if (index !== -1) {
            ClientSecondSeat.splice(index, 1)
            if(item.Id) {
                let result = await deleteSecondSeat(item.Id)
                if(result == true){
                    _self.$message({
                        showClose: true,
                        message: '次席信息删除成功',
                        type: 'success'
                    })
                }
                this.$store.dispatch(this.options.gridKey + '_set_refresh')
            }
            this.viewClientForm.ClientSecondSeat = ClientSecondSeat
        }

    }

    async deleteClient(){
        let _self = this
        this.$confirm('此操作将删除该客户及其次席信息, 是否继续?', '客户删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _self.deleteClientById()
        }).catch(() => {
        });


    }

    async deleteClientById(){
        let clientId = clone(this.viewClientForm.ClientId)
        let url = Vue.prototype.$baseUrl.imss + 'DeleteClient '
        let result = await  deleteClient(url,{Id:clientId})

        if(result){
            this.$message({
                showClose: true,
                message: '客户删除成功！',
                type: 'success'
            })
            this.viewClientVisible = false
            this.$store.dispatch(this.options.gridKey + '_set_refresh')
        }
    }





}
