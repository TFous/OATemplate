<template>

    <el-row>
        <div class="title">
            <el-col  :span="18">
                <div class="title-tools pull-left">
                    <el-button type="primary" plain @click="showModel" size="mini">
                        <svg-icon icon-class="add"></svg-icon> 新增</el-button>
                </div>
            </el-col>
            <el-col  :span="6">
                <el-input placeholder="请输入名称" clearable v-model="filterText" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"  onkeydown="search()" @click="search"></el-button>
                </el-input>
            </el-col>
        </div>
        <div class="content">
            <el-table
                    :data="tableData"
                    style="width: 100%"
            >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                >
                </el-table-column>
                <el-table-column
                        prop="displayName"
                        label="显示名称"
                >
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="说明"
                >
                </el-table-column>
                <el-table-column
                        prop="isStatic"
                        label="默认"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="showViewModel(scope.row)" size="small">编辑</el-button>
                        <el-button type="danger" plain size="small" @click="removeRole(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="p-t"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="curentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
            <!--<xheaderBar
                    :options="options"
                    :headerFn="headerFn"
                    :addShow="false"
                    :isShowSenior="true"
            >
                <slot name="addBtn">
                    <el-tooltip  content="新增" placement="top-end">
                        <el-button plain type="primary" @click="showModel()">
                            <i class="iconfont icon-add"></i>
                        </el-button>
                    </el-tooltip>
                </slot>
            </xheaderBar>
            <xtable
                    :tableFn="tableFn"
                    :options="options"
            ></xtable>
            <xpagers
                    :options="options"
            ></xpagers>-->


        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="角色名称" name="first">
                    <el-form :model="form">
                        <el-form-item label-width="0px">
                            <el-form-item label="角色名称">
                                <el-input v-model="form.name"  placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="显示名称">
                                <el-input v-model="form.displayName"  placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="form.description"  placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item >
                                <el-checkbox  v-model="form.isStatic">默认</el-checkbox>
                                <span class="p-l">
                                    <svg-icon icon-class="info"></svg-icon>
                                    <span class="info">新用户将默认拥有此角色</span>
                                </span>
                            </el-form-item>
                        </el-form-item>
                    </el-form>

                </el-tab-pane>
                <el-tab-pane label="权限" name="second">
                    <span>客户端：</span>
                    <el-select class="client-select" v-model="client" @change="changeCilent" clearable placeholder="请选择">
                        <el-option :key="item.clientId" v-for="item in clientList" :label="item.clientName" :value="item.clientId"></el-option>
                    </el-select>
                    <!--<el-tree
                            :data="data3"
                            show-checkbox
                            node-key="id"
                            :default-expanded-keys="[2, 3]"
                            :default-checked-keys="[5]">
                    </el-tree>-->
                    <tree class="p-t"  ref="roleTree" :data="treeData" :checkedKeys="checkedPerm" node-key="id"
                          :searchShow="true" :isExpandAll="true":isShowBox="true" v-on:selectedItemsChanged="onSelectedItemChanged">
                    </tree>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </el-row>

</template>
<style src="./roles.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>