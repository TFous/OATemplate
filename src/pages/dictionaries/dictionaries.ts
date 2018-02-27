/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import template from './dictionaries.vue'

const clone = require('clone')
import {getList} from '../../api-service/dictionaries.service'


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
    mounted() {
        this.getList()
    }
})

export default class Dictionaries extends Vue {
    nowTitle:string = ''
    dictionariesName: Array<object> = []
    isSelect:boolean = false // 是否选中数据字典
    options: any = Object.assign({}, Vue.prototype.$xvuex.options, {
        typeId: null,
        url: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        delUrl: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        addUrl: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        editUrl: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        urlParameter: {
            $filter: '',
            $orderby: '',
            $expand: ''
        },
        dicUrls: {},
        title: '数据字典',  // 本页面名称
        gridKey: 'immsNames',  // 本页面 Eng名，唯一
        isSelection: true, // 是否开启多选checkBox
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
                key: 'Code',
                title: '代码',
                width: 180,
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'Name',
                title: '名称',
                width: 120,
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'Description',
                title: '描述',
                searchKey: 'hide',
                column: 'hide',
                addLayer: 'hide',
                editLayer: 'hide',
                type: 'dependence',
                dependenceVal: null
            },
            {
                key: 'Note',
                title: '备注',
                type: 'textarea'
            },
            {
                key: 'TypeId',
                title: '字典类型',
                searchKey: 'hide',
                column: 'hide',
                addLayer: 'hide',
                editLayer: 'hide',
                type: 'number',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'action',
                title: '操作',
                width: 160,
                addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                editLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                searchKey: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                fixed: 'right',
                render: [
                    {
                        fn: this.editRow,
                        type: 'primary',
                        tag: 'button',
                        text: '编辑'
                    },
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

    /**
     *  设置筛选项内容
     */
    async getList() {
        let list = await getList()
        this.dictionariesName = list.value
    }
    showDic (item){
        // list
        this.$store.dispatch(this.options.gridKey + 'setData', {urlParameter: {
            $filter: `TypeId eq ${item.Id}`,
            $orderby: '',
            $expand: ''
        }})
        this.$store.dispatch(this.options.gridKey + 'setData', {typeId: item.Id})

        let searchBtn = this.getState.searchBtn
        this.$store.dispatch(this.options.gridKey + 'setData', {searchBtn: !searchBtn})
        this.nowTitle = item.Name
        this.isSelect = true
    }
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
        // initData.forEach(function (item) {
        //     VarietyDict.forEach(function (dicItem) {
        //         if (dicItem.Code === item.Variety) {
        //             item.Variety = dicItem.Value
        //         }
        //     })
        //     StdWRStatusDict.forEach(function (dicItem) {
        //         if (dicItem.Code === item.StdWRStatus) {
        //             item.StdWRStatus = dicItem.Value
        //         }
        //     })
        // })
        this.$store.dispatch(this.options.gridKey + 'setData', {tableData: initData})
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
            let url = this.options.delUrl + `(${id})`
            let requestDataHeader = Vue.prototype.$api.request(url, {
                method: 'DELETE'
            })
            fetch(requestDataHeader).then(resp => {
                return resp.text()
            }).then(data => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.$store.dispatch(this.options.gridKey + '_set_refresh')
            })
        }).catch(() => {

        })
    }

    headerFn() {
        return {}
    }

    tableFn() {
        return {}
    }

    addFn() {
        return {
            handleSubmit(formName) {
                let _this = this
                let newData = Object.assign({},_this.dataMsg,{TypeId:this.getState.typeId})
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = this.getState.addUrl
                        let requestDataHeader = Vue.prototype.$api.request(url, {
                            method: 'POST',
                            body: JSON.stringify(newData)
                        })
                        let isRequestOk
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

                            _this.$message({
                                showClose: true,
                                message: '新增成功',
                                type: 'success'
                            })
                            _this.show = false
                            _this.$store.dispatch(_this.options.gridKey + 'setData', {addSucess: data})
                            _this.$store.dispatch(_this.options.gridKey + '_set_refresh')
                        })
                    } else {
                        console.log('error submit!!')
                        return false;
                    }
                })
            },
        }
    }

    editFn() {
        return {}
    }

    get getState() {
        return this.$store.state[this.options.gridKey]
    }
}
