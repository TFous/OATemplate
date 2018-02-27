<template>
    <div class="recoverySetting">
        <h3 class="pageTit">{{options.title}}</h3>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="客户号">
                        <el-input v-model="formInline.userId" placeholder="客户号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <div style="float: right;">
                    <el-button plain type="primary" @click="synFn">
                        同步主席
                    </el-button>
                    <el-button plain type="danger" @click="batchDel">
                        删除选中
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <xtable
            :tableFn="tableFn"
            :options="options"
        ></xtable>
        <xpagers
            :options="options"
        ></xpagers>
        <xadd
            :addFn="addFn"
            :options="options"
        ></xadd>
        <xedit
            :editFn="editFn"
            :options="options"
        ></xedit>
    </div>
</template>
<style src="./recoverySetting.scss" lang="scss" scoped></style>
