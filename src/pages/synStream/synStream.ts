/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import {Component} from 'vue-property-decorator'
import template from './synStream.vue'

const clone = require('clone')
import Vue from 'vue'
import Component from 'vue-class-component'
import layer from './layer'
@Component({
    name: 'synStream',
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
        'getDetailState.initTableData': {
            handler: function (val, oldVal) {
                if (oldVal !== undefined) {
                    this.setDetailFilters()
                    this.setDetailTableData(val)
                }
            },
            deep: true
        }
    },
    /*components:{
        'layer':layer
    },*/
    beforeMount() {
        this.$xvuex.registerModule(this, this.detailOptions, this.detailOptions.gridKey)
    },
    mounted() {
        //this.initData()
    }
})

export default class synStream extends Vue {
    formInline:object = {
        userId: null
    }
    isToday:boolean = false
    addShow:boolean = false
    delShow:boolean = false
    detailVisible:boolean = true
    modelVisible:boolean = false
    ChiefStatusDict: Array<object> = [] //主席状态字典
    clientWithdrawForm: object = {
        ClientNo: ''
    }
    isShowSenior:boolean = false

    data() {
        return {
            options: Object.assign({}, Vue.prototype.$xvuex.options, {
                url: Vue.prototype.$baseUrl.imss + 'SyncLogStatistic/IMSS.Search',
                delUrl: Vue.prototype.$baseUrl.imss + 'SyncLogStatistic',
                addUrl: Vue.prototype.$baseUrl.imss + 'SyncLogStatistic',
                editUrl: Vue.prototype.$baseUrl.imss + 'SyncLogStatistic',
                urlParameter: {
                    $filter: '',
                    $orderby: 'CreationTime desc',
                    $expand: ''
                },
                dicUrls: {},
                title: '操作同步流水',  // 本页面名称
                gridKey: 'Clientwithdraw',  // 本页面 Eng名，唯一
                isSelection: false, // 是否开启多选checkBox
                table: [
                    {
                        key: 'SyncLogStatistic.Id',
                        title: 'ID',
                        addLayer: 'show',   // 新增页面是否显示：show  hide,默认show
                        editLayer: 'show', // 编辑页面 是否显示：show  hide,默认show
                        searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                        column: 'hide',  // 列表 是否显示：show  hide,默认show
                        width: 'auto',   // 长度 200,默认auto
                        type: 'number'  // 默认 string  ，种类：string  number select remoteMethod
                    },
                    {
                        key: 'SyncLogStatistic.SerialNo',
                        title: '流水号',
                        render: [
                            {
                              //class: 'pointer',
                              title: '点击查看流水详情',
                              fn: this.showDetails,
                            }
                        ]
                    },
                    {
                        key: 'ExpendProperty.SyncType',
                        title: '操作类型',
                        searchKey: 'hide',
                        type: 'select',
                        filter: true,
                        filters: [{value:`(SyncType eq IMSS.SyncLogs.SyncTypeEnum'Withdraw')`,text:'设置出金参数'},{value:`(SyncType eq IMSS.SyncLogs.SyncTypeEnum'Restore')`,text:'设置恢复参数'}],
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'SyncLogStatistic.ClientCount',
                        title: '设置客户数',
                        searchKey: 'hide',
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'SyncLogStatistic.CreationTime',
                        title: '修改时间',
                        type: 'date',
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'ExpendProperty.CreatorUserId',
                        title: '操作人',
                        width: 160,
                        searchKey: 'hide',
                        addLayer: 'hide',
                        editLayer: 'hide'
                    }
                ]
            }),
            detailOptions: Object.assign({}, Vue.prototype.$xvuex.options, {
                url: Vue.prototype.$baseUrl.imss + 'SyncLog',
                urlParameter: {
                    $filter: '',
                    $orderby: 'ClientNo',
                    $expand: ''
                },
                dicUrls: {
                    ChiefStatusDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'CSS')&$expand=DataDictionary`,
                },
                title: '操作同步流水详细',  // 本页面名称
                gridKey: 'ClientwithdrawDetail',  // 本页面 Eng名，唯一
                isSelection:false,
                table: [
                    {
                        key: 'Id',
                        title: 'ID',
                        addLayer: 'show',   // 新增页面是否显示：show  hide,默认show
                        editLayer: 'show', // 编辑页面 是否显示：show  hide,默认show
                        searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                        column: 'hide',  // 列表 是否显示：show  hide,默认show
                        width: 'auto',   // 长度 200,默认auto
                        type: 'number'  // 默认 string  ，种类：string  number select remoteMethod
                    },
                    {
                        key: 'ClientNo',
                        title: '客户号'
                    },
                    {
                        key: 'ChiefStatus',
                        title: '主席状态',
                        searchKey: 'hide',
                        dicKey: 'ChiefStatusDict',
                        /*type: 'select',
                        filter: true,
                        filters: [],*/
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'MaxWithdraw',
                        title: '最大出金限额',
                        searchKey: 'hide',
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'UnitLimit',
                        title: '出金单笔限额',
                        type: 'date',
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'SyncResultMessage',
                        title: '同步结果信息',
                        type: 'date',
                        rules: [{required: true, message: '必填'}]
                    }
                ]
            })
        }
    }

    async initData(){
        //主席状态字典
        let url = Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'CSS')&$expand=DataDictionary`
        let requestDataHeader = Vue.prototype.$api.request(url)
        fetch(requestDataHeader).then(resp => {
            if (resp.ok === true) {
                return resp.json()
            } else {
                isRequestOk = resp.ok
                return resp.json()
            }
        }).then(datas => {
            if(datas.value.length > 0){
                this.ChiefStatusDict = datas.value[0].DataDictionary
            }
        })
    }
    onSubmit () {

    }

    batchDel(){}


    /**
     *  设置筛选项内容
     */
    setFilters() {
        let _this = this
        let table = clone(this.getState.table)
        _this.$store.dispatch(_this.options.gridKey + 'setData', {table: table})
    }

    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    setTableData(tableData) {
        //debugger
        let initData = clone(tableData)
        initData.forEach(function (item) {
            /*if(item.SyncLogStatistic.SyncType == 1){
                item.SyncLogStatistic.SyncType = '设置出金参数'
            }else if(item.SyncLogStatisticSyncType == 2){
                item.SyncLogStatistic.SyncType = '设置恢复参数'
            }*/
            item.SyncLogStatistic.CreationTime = item.SyncLogStatistic.CreationTime!= null ? item.SyncLogStatistic.CreationTime.substring(0,19).replace('T',' ') :''
        })
        this.$store.dispatch(this.options.gridKey + 'setData', {tableData: initData})
    }
    /**
     *  设置筛选项内容
     */
    setDetailFilters() {
        let _this = this
        let table = clone(this.getDetailState.table)
        table.forEach(function (item) {
            if (item.filter === true && _this.$store.state[item.dicKey]) {
                let filters = []
                let selects = []
                let dicData = _this.$store.state[item.dicKey].data.value
                if(item.dicKey == 'ChiefStatusDict'){
                    if(dicData.length>0){
                        dicData[0].DataDictionary.forEach(function (dicItem) {
                            //筛选
                            let filterItem: any = {}
                            filterItem.text = dicItem.Name
                            filterItem.value = `(${item.key} eq ${dicItem.Code})`
                            filters.push(filterItem)
                            //修改新增
                            let selectItem: any = {}
                            selectItem.text = dicItem.Name
                            selectItem.value = dicItem.Code
                            selects.push(selectItem)
                        })
                        item['filters'] = filters
                        item['selects'] = selects
                    }
                }else{
                    if(dicData.length>0){
                        dicData[0].DataDictionary.forEach(function (dicItem) {
                        console.log(dicItem.Name)
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
                    }
                }
            }
        })
        _this.$store.dispatch(_this.detailOptions.gridKey + 'setData', {table: table})
    }
    /**
     * 详细
     * @param tableData 表格数据
     */
    setDetailTableData(tableData) {
        let _self = this
        let initData = clone(tableData)
        let  ChiefStatusDict= []
        if(this.$store.state.ChiefStatusDict){
            ChiefStatusDict = this.$store.state.ChiefStatusDict.data.value
            if(ChiefStatusDict.length > 0) {
                ChiefStatusDict = ChiefStatusDict[0].DataDictionary
            }
            initData.forEach(function (item) {
                //设置主席系统
                ChiefStatusDict.forEach(function (dict) {
                    if(Number(dict.Code) == item.ChiefStatus){
                        item.ChiefStatus = dict.Name
                    }
                })
                //
                if(item.SyncResultCode == '0'){
                    item.SyncResultMessage = '同步成功'
                }

            })
            this.$store.dispatch(this.detailOptions.gridKey + 'setData', {tableData: initData})
        }

    }

    editRow(scope) { // 设置修改弹窗数据
        let _this = this
        let data = scope.row
        if (data) {
            this.getState.initTableData.forEach(function (item) {
                if (item.Id === data.Id) {
                    _this.$store.dispatch(_this.options.gridKey + '_edit_Window_Visible', item)
                }
            })
        }
    }

    deleteRow(scope) {
        this.$confirm('此操作将删除该项, 是否继续?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let id = scope.row.Id
            let url = `${Vue.prototype.$baseUrl.imss}/ClientWithdraw(${id})`
            let requestDataHeader = Vue.prototype.$api.request(url, {
                method: 'DELETE'
            })
            fetch(requestDataHeader).then(resp => {
                return resp.json()
            }).then(data => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            })
        }).catch(() => {

        })
    }

    headerFn() {
        return {}
    }

    tableFn() {
        return {
            getList(size) {
                let _this = this
                let $requestUrl = clone(this.getState.requestUrl)
                let $countUrl

                let splitUrl = $requestUrl.split('?$')
                // page
                let pageSize, pageSkip
                if (size) {
                    pageSize = size
                    pageSkip = 0
                } else {
                    let pagerCurrentPage = _this.getState.pager_CurrentPage
                    pageSize = _this.getState.pager_Size
                    pageSkip = _this.getState.pager_Size * (pagerCurrentPage - 1)
                }

                if (splitUrl.length === 1) {
                    $countUrl = `${splitUrl[0]}/$count`
                    $requestUrl += `?$top=${pageSize}&$skip=${pageSkip}`
                } else if (splitUrl.length === 2) {
                    $countUrl = `${splitUrl[0]}/$count?$${splitUrl[1]}`
                    $requestUrl += `&$top=${pageSize}&$skip=${pageSkip}`
                } else if (splitUrl.length > 2) {
                    console.error('获取总条数count URL失败！')
                }
                /**
                 *  requestCountHeader 获取总条数，不含分页信息
                 *
                 */
                $countUrl = $countUrl.replace('/IMSS.Search','')
                let requestCountHeader = Vue.prototype.$api.request($countUrl)
                let isRequestOk
                fetch(requestCountHeader).then(resp => {
                    isRequestOk = resp.ok
                    if (isRequestOk === false) {
                        return resp.json()
                    } else {
                        return resp.text()  // 没有问题
                    }
                }).then(count => {
                    if (isRequestOk === false) {
                        _this.$notify.error({
                            title: '错误消息',
                            message: data.message
                        })
                        return false
                    }
                    if (Number(count) === 0) {
                        _this.ready = true
                        _this.$store.dispatch(_this.options.gridKey + 'setData', {tableData: []})
                        _this.$store.dispatch(_this.options.gridKey + 'setData', {pager_Total: 0})
                        _this.$store.dispatch(_this.options.gridKey + 'setData', {pager_CurrentPage: 1})
                        _this.$message('无符合要求数据')
                        return false
                    }
                    /**
                     *  当获取总条数不位0的时候，在拉取数据
                     */
                    _this.$store.dispatch(_this.options.gridKey + 'setData', {pager_Total: Number(count)})

                    // requestDataHeader 获取分页 的data
                    let requestDataHeader = Vue.prototype.$api.request($requestUrl,{method: 'POST'})
                    fetch(requestDataHeader).then(resp => {
                        isRequestOk = resp.ok
                        return resp.json()
                    }).then(data => {
                        if (isRequestOk === false) {
                            _this.$notify.error({
                                title: '错误消息',
                                message: data.message
                            })
                            return false
                        }
                        _this.$store.dispatch(_this.options.gridKey + 'setData', {initTableData: data})
                    })
                })
            },
            searchFn() {
                //debugger
                let _this = this
                let url = this.getState.url
                let urlObj = {}
                /**
                 *  条件筛选
                 *
                 */
                // 正常筛选
                let filterUrl = ``
                let filtersBOx = _this.getState.filterBox
                if (Object.keys(filtersBOx).length !== 0) {
                    for (let filters in filtersBOx) {
                        let filtersHtmls = ``
                        filtersBOx[filters].forEach(function (key) {
                            filtersHtmls += `${key}or`
                        })
                        filterUrl += `(${filtersHtmls.slice(0, -2)})and`
                    }
                }
                // expand 筛选
                let expandFilterUrl = ``
                let expandFiltersBOx = _this.getState.efilterBox
                if (Object.keys(expandFiltersBOx).length !== 0) {
                    for (let filters in expandFiltersBOx) {
                        let filtersHtmls = ``
                        expandFiltersBOx[filters].forEach(function (key) {
                            let splitKey = key.split(' ')
                            let splitKey01 = splitKey[0].split('.')
                            let key1
                            if (splitKey01.length === 1) {
                                key1 = splitKey[0]
                            } else if (splitKey01.length === 2) {
                                key1 = splitKey[1]
                            } else {
                                console.error('splitKey设置有错误')
                                console.error(splitKey)
                            }
                            let newKey = `(${key1.split('(')[1]} ${splitKey[1]} ${splitKey[2]}`
                            filtersHtmls += `${newKey}or`
                        })
                        expandFilterUrl += `(${filtersHtmls.slice(0, -2)})and`
                    }
                }
                let initExpand = _this.getState.urlParameter.$expand
                let expandUrl
                if (initExpand !== '' && initExpand !== undefined) {
                    expandUrl = initExpand
                } else {
                    expandUrl = ''
                }
                if (expandUrl !== '') {
                    if (expandFilterUrl !== '') {
                        urlObj['expandUrl'] = `$expand=${expandUrl}($filter=${expandFilterUrl.slice(0, -3)})`
                    } else {
                        urlObj['expandUrl'] = `$expand=${expandUrl}`
                    }
                }

                let initFilter = _this.getState.urlParameter.$filter
                if (filterUrl !== '') {
                    if (initFilter !== '') {
                        let url = `$filter=(${initFilter} and ${filterUrl.slice(0, -3)})`
                        urlObj['filterUrl'] = _this.isHasKey(urlObj['filterUrl'], url, '$filter=')
                    } else {
                        let url = `$filter=(${filterUrl.slice(0, -3)})`
                        urlObj['filterUrl'] = _this.isHasKey(urlObj['filterUrl'], url, '$filter=')
                    }
                } else {
                    if (initFilter !== '') {
                        let url = `$filter=(${initFilter})`
                        urlObj['filterUrl'] = _this.isHasKey(urlObj['filterUrl'], url, '$filter=')
                    }
                }
                /**
                 *  关键词搜索
                 *
                 */
                let isSeniorSearch = _this.getState.isSeniorSearch
                if (isSeniorSearch === false) {
                    _this.keyWordSearch(urlObj)
                } else {
                    _this.seniorSearchFn(urlObj)
                }
                /**
                 *  排序条件
                 *  目前只支持单列排序
                 *  多列功能后面组建支持，功能上基本没问题
                 *
                 *  如果执行排序，则用排序，不然用初始排序
                 */
                let sortUrl = ``
                let sortBox = _this.getState.sortBox
                if (Object.keys(sortBox).length !== 0) {
                    sortUrl = `$orderby=${sortBox.prop} ${sortBox.order}`
                }
                let initSort = _this.getState.urlParameter.$orderby
                if (sortUrl !== '') {
                    urlObj['sortUrl'] = sortUrl
                } else if (initSort !== '' && initSort !== undefined) {
                    urlObj['sortUrl'] = `$orderby=${initSort}`
                }
                /**
                 *  $expand 扩展
                 *  目前只支持初加载 vuex => options => urlParameter  => $expand
                 *
                 */
//                let initExpand = _this.getState.urlParameter.$expand
//                let expandUrl = initExpand !== '' ? initExpand : ''
//                if (expandUrl !== '') {
//                    urlObj['expandUrl'] = `$expand=${expandUrl}`
//                }
                /**
                 *  url 拼接
                 */
                let urlValues = Object.values(urlObj)
                urlValues.forEach(function (item, index) {
                    if (index === 0) {
                        url += `?${item}`
                    } else {
                        url += `&${item}`
                    }
                })
                _this.$store.dispatch(_this.options.gridKey + 'setData', {requestUrl: url})
            },
            setStarTime(dateTime) {
                let times = new Date(dateTime)
                let year = times.getFullYear()
                let month = (times.getMonth() + 1).toString().length === 2 ? (times.getMonth() + 1) : `0${(times.getMonth() + 1)}`
                let day = (times.getDate()).toString().length === 2 ? (times.getDate()) : `0${(times.getDate())}`
                return `${year}-${month}-${day}T00:00:00Z`
            },
            endTime(dateTime) {
                let times = new Date(dateTime)
                let year = times.getFullYear()
                let month = (times.getMonth() + 1).toString().length === 2 ? (times.getMonth() + 1) : `0${(times.getMonth() + 1)}`
                let day = (times.getDate()).toString().length === 2 ? (times.getDate()) : `0${(times.getDate())}`
                return `${year}-${month}-${day}T15:59:59Z`
            },
            //关键词搜索
            keyWordSearch(urlObj) {

                let _this = this
                let searchKey = _this.getState.searchKeys
                let searchVal = _this.getState.searchVal
                if (searchVal !== '') {  // 如果搜索有值
                    let valUrl = ``
                    let key = ''
                    if (searchKey === 'searchAll') {
                        for (let item of _this.getState.table) {
                            if(item.key.indexOf('.') !== -1){
                                key = item.key.split('.')[1]
                            }

                            if ((item.type === '' || item.type === 'textarea' || item.type === 'string') && item.searchKey !== 'hide') {
                                valUrl += `(contains(${key},'${searchVal}'))or`
                            } else if (item.type === 'number' && Number.isNaN(Number(searchVal)) !== true) {
                                valUrl += `(${key} eq ${Number(searchVal)})or`
                            }
                        }
                    } else {
                        for (let item of _this.getState.table) {
                            if (item.key === searchKey) {
                                if (item.type === '' || item.type === 'textarea' || item.type === 'string') {
                                    valUrl += `(contains(${item.key},'${searchVal}'))or`
                                } else if (item.type === 'number') {
                                    if (Number.isNaN(Number(searchVal)) !== true) {
                                        valUrl += `(${item.key} eq ${Number(searchVal)})or`
                                    } else {
                                        _this.$message({
                                            showClose: true,
                                            message: '参数必须为数字',
                                            type: 'warning'
                                        })
                                        return false
                                    }
                                }
                            }
                        }
                    }
                    if (valUrl !== '') {
                        let url = `$filter=(${valUrl.slice(0, -2)})`
                        urlObj['filterUrl'] = _this.isHasKey(urlObj['filterUrl'], url, '$filter=')
                    }
                }
            },
            //     高级搜索
            seniorSearchFn(urlObj) {
               let  _self = this
                debugger
                let _this = this
                let seniorObj = _this.getState.seniorSearchBox
                let otherSeniorSearchOpt = _this.getState.otherSeniorSearchOpt
                let seniorSearchType = this.getState.seniorSearchType
                let typeKey, sliceLength
                if (seniorSearchType === false) {
                    typeKey = 'or'
                    sliceLength = -2
                } else {
                    typeKey = 'and'
                    sliceLength = -3
                }
                let valUrl = ``
                for (let item in seniorObj) {
                    if (typeof seniorObj[item] === 'number') {
                        let key = ''
                        if(item.indexOf('.') !== -1){
                            key = item.split('.')[1]
                        }
                        valUrl += `(${key} eq ${Number(seniorObj[item])})${typeKey}`
                    } else if (typeof seniorObj[item] === 'string') {
                        let key = ''
                        if(item.indexOf('.') !== -1){
                            key = item.split('.')[1]
                        }
                        valUrl += `(contains(${key},'${seniorObj[item]}'))${typeKey}`
                    } else if (seniorObj[item] instanceof Array === true) {
                        let startTime = _self.setStarTime(seniorObj[item][0])
                        let endTime = _self.endTime(seniorObj[item][1])
                        let key = ''
                        if(item.indexOf('.') !== -1){
                            key = item.split('.')[1]
                        }
                        valUrl += `(${key} ge ${startTime} and ${key} le ${endTime})${typeKey}`
                    }
                }
                //        手动添加的搜索条件
                for (let item in otherSeniorSearchOpt) {
                    if (otherSeniorSearchOpt[item] instanceof Array === true) {
                        let length = otherSeniorSearchOpt[item].length
                        let i = 0
                        for (; i < length; i++) {
                            // 最后一个是and
                            if (i === (length - 1)) {
                                if (typeof otherSeniorSearchOpt[item][i] === 'number') {
                                    valUrl += `(${item} eq ${otherSeniorSearchOpt[item][i]})${typeKey}`
                                } else if (typeof otherSeniorSearchOpt[item][i] === 'string') {
                                    valUrl += `(${item} eq '${otherSeniorSearchOpt[item][i]}')${typeKey}`
                                }
                            } else {
                                if (typeof otherSeniorSearchOpt[item][i] === 'number') {
                                    valUrl += `(${item} eq ${otherSeniorSearchOpt[item][i]})or`
                                } else if (typeof otherSeniorSearchOpt[item][i] === 'string') {
                                    valUrl += `(${item} eq '${otherSeniorSearchOpt[item][i]}')or`
                                }
                            }
                        }
                    } else {
                        if (typeof otherSeniorSearchOpt[item] === 'number') {
                            valUrl += `(${item} eq ${otherSeniorSearchOpt[item]})${typeKey}`
                        } else if (typeof otherSeniorSearchOpt[item][i] === 'string') {
                            valUrl += `(${item} eq '${otherSeniorSearchOpt[item]}')${typeKey}`
                        }
                    }
                }
                if (valUrl !== '') {
                    let url = `$filter=(${valUrl.slice(0, sliceLength)})`
                    urlObj['filterUrl'] = _this.isHasKey(urlObj['filterUrl'], url, '$filter=')
                }
            }


        }
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

    get getDetailState() {
        return this.$store.state[this.detailOptions.gridKey]
    }

    modelClose(){
        this.modelVisible = false
        this.detailVisible = false
    }
    showDetails(scope){

        this.modelVisible = true
        this.detailVisible = true
        let data = scope.row
        let url = `${Vue.prototype.$baseUrl.imss}SyncLog?$filter=(SerialNo eq '${data.SyncLogStatistic.SerialNo}')`
        this.$store.dispatch(this.detailOptions.gridKey + 'setData', {urlParameter: {$filter:`SerialNo eq '${data.SyncLogStatistic.SerialNo}'`} })
        let searchBtn = this.detailOptions.searchBtn
        this.$store.dispatch(this.detailOptions.gridKey + 'setData', {searchBtn: !searchBtn})

    }
}
