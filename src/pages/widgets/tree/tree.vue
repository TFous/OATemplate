<template>

    <el-row>
        <el-input v-if="searchShow" :class="inputClass" placeholder="输入关键字进行过滤" clearable  v-model="filterText" ></el-input>
        <el-tree
                :data="data"
                :props="defaultProps"
                node-key="id"
                :highlight-current="true"
                ref="tree"
                :show-checkbox="isShowBox"
                :default-expand-all="isExpandAll"
                :default-checked-keys="checkedKeys"
                :expand-on-click-node="false"
                @check-change="handleCheckChange"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
        >
        </el-tree>
    </el-row>

</template>
<style src="./tree.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>