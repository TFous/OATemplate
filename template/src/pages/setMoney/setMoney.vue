<template>
    <div>
      <h3 class="pageTit">{{title}}</h3>
      <div >
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="">
                        <el-button type="primary" @click="showClientModel">选择客户</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <div style="float: right;">
                    <el-button plain type="primary" @click="exportBank">导入银期大额
                    </el-button>
                    <el-button plain type="success" @click="Same">同步主席
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <div>
            <template>
                <el-table
                    :data="setMoneyTableDatas"
                    border
                    @selection-change="selectTableCheckbox"
                    @cell-click="showModel"
                    style="width: 100%;cursor: pointer;">
                    <el-table-column
                      prop="ClientNo"
                      label="客户号">
                    </el-table-column>
                    <el-table-column
                      prop="StatusName"
                      label="主席状态">
                    </el-table-column>
                    <el-table-column
                      prop="MaxWithdraw"
                      label="最大出金限额">
                    </el-table-column>
                    <el-table-column
                      prop="UnitLimit"
                      label="出金单笔限额">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                        <el-button @click="remove(scope.row)" type="danger" plain>删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <template>
            <el-dialog
              title="次席客户出金参数设置"
              :visible.sync="modelVisible"
              width="50%"
              :before-close="modelClose">
              <el-form ref="modelForm" class="form-content" :model="modelForm" label-width="100px">
                    <el-form-item>
                    <el-col :span="12" class="p-r">
                    <el-form-item label="客户号" prop="ClientNo">
                        <el-input disabled v-model="modelForm.ClientNo"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12" class="p-r">
                        <el-form-item label="主席状态" prop="Status">
                            <el-select v-model="modelForm.Status" placeholder="状态">
                              <el-option  v-for="(seatStatus, index) in ChiefStatusDict" :key="ChiefStatusDict.Name" :label="seatStatus.Name" :value="seatStatus.Code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    </el-form-item>
                    <el-form-item>
                    <el-col :span="12" class="p-r">
                    <el-form-item label="最大出金限额" prop="MaxWithdraw">
                        <el-input v-model="modelForm.MaxWithdraw" type="number"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12" class="p-r">
                        <el-form-item label="出金单笔限额" prop="UnitLimit">
                            <el-input v-model="modelForm.UnitLimit" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit('modelForm')">保存</el-button>
                        <el-button @click="modelVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </template>
        <template>
        <el-dialog
          title="选择客户"
          :visible.sync="clientModelVisible"
          width="60%"
          :before-close="clientModelClose">
            <el-button class="model-button" plain type="primary" @click="addClients">
              添加
            </el-button>
            <span class="p-l" >
              <svg-icon icon-class="info"></svg-icon>
              <span class="info">温馨提示：勾选全部按钮只勾选当前页数据</span>
            </span>
            <xheaderBar
            :options="options"
            :addShow="false"
            :delShow="false"
            :isShowSenior="true"
            ></xheaderBar>
            <xtable
                :tableFn="tableFn"
                :options="options"
            ></xtable>
            <xpagers
                :options="options"
            ></xpagers>
        </el-dialog>
        </template>
      </div>
      <!-- <div v-if="showErrorInfo" class="error-info">
          <p>Sorry，您无相关权限，快去联系管理员吧.....</p>
          <img src="./../app/img/error.png" />
      </div> -->
    </div>

    <!-- <choseClient></choseClient> -->
</template>
<style src="./setMoney.scss" lang="scss" scoped></style>
<style src="./../app/common.scss" lang="scss" scoped></style>
