/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import choseClient from './choseClient.vue'
//import {getafterData} from '../../../api-service/synStream.service'

const clone = require('clone')

@Component({
    name: 'choseClient',
    mixins: [choseClient],
    watch: {
        'getCommon.layerShow': {
            handler: function (val, oldVal) {
                this.show = val
                if (val === true) {
                    let copyData = clone(this.getCommon.userMsg)
                    this.getTableData(copyData)
                }
            },
            deep: false
        },
        beforeMount() {
            this.$xvuex.registerModule(this, this.detailOptions, this.detailOptions.gridKey)
        }
    },
    mounted() {
    }
})

export default class ChoseClient extends Vue {
    show: boolean = false
    data() {
        return {
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
                isSelection: true, // 是否开启多选checkBox
                pager_size_opts: [30, 50, 100],
                pager_Size: 30,
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
                    }
                ]
            })
        }
    }

    get getDetailState() {
        return this.$store.state[this.detailOptions.gridKey]
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

        })
        this.$store.dispatch(this.detailOptions.gridKey + 'setData', {tableData: initData})
    }

    setVisible() {
        this.$store.dispatch('common/setcommon', {layerShow: false})
    }

    async getTableData(val) {
        this.$store.dispatch(this.detailOptions.gridKey + 'setData', {urlParameter: {$filter:`SerialNo eq '${val.SerialNo}'`} })
        let searchBtn = this.getDetailState.searchBtn
        this.$store.dispatch(this.detailOptions.gridKey + 'setData', {searchBtn: !searchBtn})

    }


    get getCommon() {
        return this.$store.state.common
    }

    get getState() {
        return this.$store.state
    }
}
