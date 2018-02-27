/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import layer from './layer.vue'
import {getafterData} from '../../../api-service/changeHistory.service'

const clone = require('clone')

@Component({
    name: 'layer',
    mixins: [layer],
    watch: {
        'getCommon.layerShow': {
            handler: function (val, oldVal) {
                this.show = val
                if (val === true) {
                    let copyData = clone(this.getCommon.userMsg)
                    let beforeData = this.changeVal(copyData)
                    this.beforeData = [beforeData]
                    this.getafterData(this.getCommon.userMsg)
                }
            },
            deep: false
        }
    },
    mounted() {
    }
})

export default class Layer extends Vue {
    show: boolean = false
    beforeData: any = [{ChangeLog:{ClientNo: null, Note: null}}] // 页面初始  名字是反的 beforeData =》 afterData，具体看筛选条件
    afterData: any = [{ChangeLog:{ClientNo: null, Note: null}}]

    setVisible() {
        this.$store.dispatch('common/setcommon', {layerShow: false})
    }

    async getafterData(val) {
        let ClientId = val.ChangeLog.ClientId
        let BatchNo = val.ChangeLog.BatchNo
        let data = await getafterData(ClientId,BatchNo)
        this.afterData = [this.changeVal(data[0])]
    }

    changeVal(obj): object {
        try {
            obj.ChangeLog.CloseTime = obj.ChangeLog.CloseTime.substring(0,19).replace('T',' ')
            obj.ChangeLog.OpenTime = obj.ChangeLog.OpenTime.substring(0,19).replace('T',' ')
        } catch (e) {
        }
        obj.ChangeLog.DoubleOpen = obj.ChangeLog.DoubleOpen === true ? '是' : '否'
        obj.ChangeLog.CommodityOption = obj.ChangeLog.CommodityOption === true ? '开' : '关'
        obj.ChangeLog.FinancialOption = obj.ChangeLog.FinancialOption === true ? '开' : '关'
        let ss = this.getState.SS.data.value[0].DataDictionary
        ss.forEach(function (item) {
            if (item.Id === obj.ChangeLog.SecondSeat) {
                obj.ChangeLog.SecondSeat = item.Name
            }
        })
        let sss = this.getState.SSS.data.value[0].DataDictionary
        sss.forEach(function (item) {
            if (item.Id === obj.ChangeLog.SecondSeatStatus) {
                obj.ChangeLog.SecondSeatStatus = item.Name
            }
        })
        return obj
    }

    get getCommon() {
        return this.$store.state.common
    }

    get getState() {
        return this.$store.state
    }
}
