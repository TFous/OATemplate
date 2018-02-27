<template>
    <div class="changeHistory">
        <h3 class="pageTit">{{options.title}}</h3>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="客户号">
                        <el-input :clearable="true" v-model="formInline.userId" placeholder="客户号" @keyup.enter.native="onSubmit"></el-input>
                        <input style="display: none;" v-model="formInline.userId" placeholder="客户号" @keyup.enter="onSubmit" type="text">
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <div style="float: right;">
                    <el-button plain type="" @click="refreshFn">
                        <i class="iconfont icon-refresh"></i>
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <div>
            <xtable
                :tableFn="tableFn"
                :options="options"
            ></xtable>
            <xpagers
                :options="options"
            ></xpagers>
        </div>
        <layer></layer>
    </div>
</template>
<style src="./changeHistory.scss" lang="scss" scoped></style>
