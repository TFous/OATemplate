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
                <el-table-column
                        prop="userName"
                        label="登陆名称"
                >
                </el-table-column>

                <el-table-column
                        prop="fullName"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="isActive"
                        label="有效"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="showViewModel(scope.row)" size="small">编辑</el-button>
                        <el-button type="warning" plain @click="showPermModel(scope.row)" size="small">权限</el-button>
                        <el-button type="danger" plain size="small" @click="removeUser(scope.row)">删除</el-button>
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
            >

            </xtable>
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
                <el-tab-pane label="用户信息" name="first">

                    <el-form label-width="100px"  ref="form" :model="form" :rules="ruleForm">
                        <el-form-item  label="登录名" prop="userName">
                            <el-input  placeholder="" v-model="form.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="姓" prop="surname">
                            <el-input  placeholder="" v-model="form.surname" ></el-input>
                        </el-form-item>
                        <el-form-item label="名" prop="name">
                            <el-input  placeholder="" v-model="form.name" ></el-input>
                        </el-form-item>
                        <el-form-item v-if="!isEdit" label="密码" prop="password">
                            <el-input type="password" placeholder="" v-model="form.password" ></el-input>
                        </el-form-item>
                        <el-form-item v-if="!isEdit" label="确认密码" prop="password2">
                            <el-input type="password"  placeholder="" v-model="form.password2" ></el-input>
                        </el-form-item><!--:rules="{required: true, message: '邮箱不能为空', trigger: 'blur'}"-->
                        <el-form-item label="邮箱" prop="emailAddress">
                            <el-input  placeholder="" v-model="form.emailAddress" ></el-input>
                        </el-form-item>
                        <el-form-item label="启用">
                            <el-checkbox v-model="form.isActive"></el-checkbox>
                            <span class="p-l">
                                <span class="info">( 禁用的账号无法登录 )</span>
                            </span>
                        </el-form-item>

                    </el-form>

                </el-tab-pane>
                <el-tab-pane label="角色" name="second">
                    <el-checkbox-group v-model="form.roleNames" v-for="role in roleData" :key="role.id">
                        <el-checkbox :label="role.name"></el-checkbox>
                    </el-checkbox-group>
                    <!--<el-form >
                        <el-form-item v-model="selectRoles" v-for="role in roleData" :key="role.id">
                            <el-checkbox >{{role.label}}</el-checkbox>
                        </el-form-item>
                    </el-form>-->

                </el-tab-pane>
                <el-tab-pane label="组织机构" name="org">
                    <tree :data="orgData" :searchShow="true" :checkedKeys="checkedOrg"  :isExpandAll="true":isShowBox="true" v-on:selectedItemsChanged="onSelectedItemChanged"></tree>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="!isEdit" type="primary" @click="onSave('form')">确 定</el-button>
                <el-button v-if="isEdit"  type="primary" @click="onSubmit('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="权限"
                :visible.sync="permDialogVisible"
                width="30%"
                :before-close="handlePermClose">
                <span>客户端：</span>
                <el-select class="client-select" v-model="client" @change="changeCilent" clearable placeholder="请选择">
                    <el-option :key="item.clientId" v-for="item in clientList" :label="item.clientName" :value="item.clientId"></el-option>
                </el-select>
                <tree class="p-t"  ref="roleTree" :data="permTreeData" :checkedKeys="checkedPerm" node-key="id"
                      :searchShow="true" :isExpandAll="true":isShowBox="true" v-on:selectedItemsChanged="onSelectedPermChanged">
                </tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="permDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePerm">确 定</el-button>
            </span>
        </el-dialog>

    </el-row>

</template>
<style src="./users.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>