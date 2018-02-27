<template>
    <div>
        <el-dialog
                    title="选择客户"
                    class="formDialog details"
                    :close-on-click-modal="false"
                    @close="setVisible"
                    :visible.sync="show"
                >
                <el-button class="model-button" plain type="primary" @click="addClients">
                  添加
                </el-button>
                <xtable
                    :tableFn="tableFn"
                    :options="options"
                ></xtable>
                <xpagers
                    :options="options"
                ></xpagers>
        </el-dialog>
    </div>
</template>
