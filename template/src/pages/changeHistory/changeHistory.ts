/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import template from './changeHistory.vue'

import layer from './layer'

const clone = require('clone')

@Component({
    name: 'dictionaries',
    mixins: [template],
    watch: {
        'getState.initTableData': {
            handler: function (val, oldVal) {
                if (oldVal !== undefined) {
                    // this.setFilters()
                    this.setTableData(val)
                }
            },
            deep: true
        }
    },
    components: {
        'layer': layer
    },
    mounted() {
    }
})

export default class Dictionaries extends Vue {
    formInline: object = {
        userId: ''
    }
    options: any = Object.assign({}, Vue.prototype.$xvuex.options, {
        url: Vue.prototype.$baseUrl.imss + 'ClientChangeLog/IMSS.Search',
        delUrl: Vue.prototype.$baseUrl.imss + 'ClientChangeLog',
        addUrl: Vue.prototype.$baseUrl.imss + 'ClientChangeLog',
        editUrl: Vue.prototype.$baseUrl.imss + 'ClientChangeLog',
        urlParameter: {
            $filter: `ChangeLogType eq 'after'`,
            $orderby: 'CreationTime desc',
            $expand: ''
        },
        dicUrls: {
            SS: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary`,  // 次席系统
            SSS: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary`  // 次席状态
        },
        title: '次席变更记录',  // 本页面名称
        gridKey: 'ClientChangeLog',  // 本页面 Eng名，唯一
        isSelection: false, // 是否开启多选checkBox
        table: [
            {
                key: 'Id',
                title: 'ID',
                addLayer: 'show',   // 新增页面是否显示：show  hide,默认show
                editLayer: 'show', // 编辑页面 是否显示：show  hide,默认show
                searchKey: 'show', // 搜索下拉 是否显示：show  hide,默认show
                column: 'hide',  // 列表 是否显示：show  hide,默认show
                width: 'auto',   // 长度 200,默认auto
                type: 'number'  // 默认 string  ，种类：string  number select remoteMethod
            },
            {
                key: 'ChangeLog.ClientNo',
                title: '客户号',
                render: [
                    {
                        fn: this.showDetails,   // 事件
                        title: '点击查看详情'  // 鼠标移到上面展示的内容
                    }
                ],
                width: 180
            },
            {
                key: 'ChangeLog.Description',
                title: '变更说明',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'ChangeLog.CreationTime',
                title: '日期',
                // sortable: true,
                width: 220,
                type: 'date',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'copyCreationTime',
                title: '复制日期搜索用',
                sortable: true,
                width: 220,
                addLayer: 'show',   // 新增页面是否显示：show  hide,默认show
                editLayer: 'show', // 编辑页面 是否显示：show  hide,默认show
                searchKey: 'show', // 搜索下拉 是否显示：show  hide,默认show
                column: 'hide',
                type: 'date',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'ExtendedProperty.CreateUser',
                title: '操作人',
                width: 220,
                addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                editLayer: 'hide'  // 新增页面 是否显示：不显示写，显示可不写或其他值
            }
        ]
    })

    // layer
    showDetails(item) {
        this.$store.dispatch('common/setcommon', {layerShow: true})
        this.$store.dispatch('common/setcommon', {userMsg: item.row})
    }

    refreshFn() {
        this.$store.dispatch(this.options.gridKey + '_set_refresh')
    }

    onSubmit() {
        let userId = this.formInline.userId
        if (userId === '') {
            this.refreshFn()
            return false
        }
        let url = `${Vue.prototype.$baseUrl.imss}ClientChangeLog/IMSS.Search?$filter=contains(ClientNo,'${userId}') and ChangeLogType eq 'before'&$orderby=CreationTime desc`
        this.$store.dispatch(this.options.gridKey + 'setData', {requestUrl: url})
    }

    /**
     *  设置筛选项内容
     */
    setFilters() {
        let _this = this
        let table = clone(this.getState.table)
        table.forEach(function (item) {
            if (item.filter === true) {
                let filters = []
                let selects = []
                let dicData = _this.$store.state[item.dicKey].data.value
                dicData.forEach(function (dicItem) {
//            帅选
                    let filterItem: any = {}
                    filterItem.text = dicItem.Value
                    filterItem.value = `(${item.key} eq '${dicItem.Code}')`
                    filters.push(filterItem)
//            修改新增
                    let selectItem: any = {}
                    selectItem.text = dicItem.Value
                    selectItem.value = dicItem.Code
                    selects.push(selectItem)
                })
                item['filters'] = filters
                item['selects'] = selects
            }
        })
        _this.$store.dispatch(_this.options.gridKey + 'setData', {table: table})
    }

    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    setTableData(tableData) {
        let initData = clone(tableData)
        initData.forEach(function (item) {
            item.copyCreationTime = item.ChangeLog.CreationTime
            item.ChangeLog.CreationTime = item.ChangeLog.CreationTime.substring(0, 19).replace('T', ' ')
        })
        this.$store.dispatch(this.options.gridKey + 'setData', {tableData: initData})
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

                //console.log($requestUrl)
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
                $countUrl = $countUrl.replace('/IMSS.Search', '')
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
                    let requestDataHeader = Vue.prototype.$api.request($requestUrl, {method: 'POST'})
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
}
