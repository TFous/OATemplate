/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import template from './recoverySetting.vue'
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
    mounted() {
    }
})

export default class Dictionaries extends Vue {
    formInline:object = {
        userId: null
    }

    options: any = Object.assign({}, Vue.prototype.$xvuex.options, {
        url: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        delUrl: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        addUrl: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        editUrl: Vue.prototype.$baseUrl.imss + 'DataDictionary',
        urlParameter: {
            $filter: 'TypeId eq 2',
            $orderby: '',
            $expand: ''
        },
        dicUrls: {},
        title: '恢复参数设置',  // 本页面名称
        gridKey: 'recoverySetting',  // 本页面 Eng名，唯一
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
                title: '客户号',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'Name',
                title: '主席状态',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'Description',
                title: '最大出金限额',
                searchKey: 'hide',
                column: 'hide',
                addLayer: 'hide',
                editLayer: 'hide',
                type: 'dependence',
                dependenceVal: null
            },
            {
                key: 'Note',
                title: '出金单笔限额',
                type: 'textarea'
            },
            {
                key: 'action',
                title: '操作',
                width: 160,
                addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                editLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                searchKey: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
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
    onSubmit () {

    }

    batchDel(){}
    // 同步主席
    synFn(){}

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
        return {}
    }

    editFn() {
        return {}
    }

    get getState() {
        return this.$store.state[this.options.gridKey]
    }
}
