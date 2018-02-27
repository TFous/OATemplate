<template><!-- 操作同步流水 -->
    <div>
        <h3 class="pageTit">{{options.title}}</h3>
        <div>
            <xheaderBar
                :options="options"
                :headerFn="headerFn"
                :addShow="addShow"
                :delShow="delShow"
                :isShowSenior="isShowSenior"
            >
            </xheaderBar>
            <xtable
                :tableFn="tableFn"
                :options="options"
            ></xtable>
            <xpagers
                :options="options"
            ></xpagers>
        </div>
        <!-- <layer></layer> -->
        <template>
        <el-dialog
          title="流水详情"
          :visible.sync="modelVisible"
          width="50%"
          :before-close="modelClose">
            <xtable
                :options="detailOptions"
            ></xtable>
            <xpagers
                :options="detailOptions"
            ></xpagers>
        </el-dialog>
        </template>
    </div>
</template>
<style src="./synStream.scss" lang="scss" scoped></style>
