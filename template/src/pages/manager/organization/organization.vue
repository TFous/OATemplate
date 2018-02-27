<template>

    <el-row>
        <div class="row">
            <el-col  :span="12">
                <div class="title">
                    组织结构树
                    <div class="title-tools">
                        <el-tooltip class="item" effect="dark" content="新增子组织" placement="top-start">
                            <el-button type="primary" plain @click="showModel" size="mini"><svg-icon icon-class="add"></svg-icon> </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑组织" placement="top-start">
                            <el-button type="success" plain @click="showEditModel" size="mini"><svg-icon icon-class="edit"></svg-icon> </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除组织" placement="top-start">
                            <el-button type="danger" plain @click="deleteOrg" size="mini"><svg-icon icon-class="delete"></svg-icon> </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="ibox">
                    <tree :data="orgData" ref="orgRef" :searchShow="true" inputClass="input-small" :isExpandAll="true" :isShowBox="false"  v-on:nodeChanged="onNodeChanged" ></tree>

                </div>


            </el-col>
            <el-col  :span="12">
                <div class="title">

                    {{orgName}}
                    <div class="title-tools">
                        <el-button type="primary" v-if="selectOrg != null" @click="showUserModel" plain> 添加用户</el-button>
                    </div>
                </div>
                <div class="ibox">
                    <div v-if="selectOrg">
                        <el-table
                                :data="userTableData"
                                style="width: 100%"
                        >
                            <!--<el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>-->
                            <!--<el-table-column
                                    prop="userName"
                                    label="登录名"
                            >
                            </el-table-column>-->
                            <el-table-column
                                    prop="fullName"
                                    label="姓名"
                            >
                            </el-table-column>
                            <!--<el-table-column
                                    prop="emailAddress"
                                    label="邮箱"
                            >
                            </el-table-column>-->
                            <el-table-column
                                    fixed="right"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" plain size="small" @click="removeOrgUser(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                class="p-t"
                                @size-change="handleUserSizeChange"
                                @current-change="handleUserCurrentChange"
                                :current-page="usercurentPage"
                                :page-sizes="userpageSizes"
                                :page-size="userpageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="usertotalCount">
                        </el-pagination>
                       <!-- <xtable
                                :tableFn="tableFn"
                                :options="options"
                        ></xtable>
                        <xpagers
                                :options="options"
                        ></xpagers>
                        <xedit
                                :editFn="editFn"
                                :options="options"
                        ></xedit>-->
                    </div>
                    <div v-else>选择一个组织成员</div>
                </div>


            </el-col>


        </div>
        <!--添加编辑组织页面-->
        <el-dialog
                :title="orgTitle"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">

            <el-form ref="orgForm" :model="orgForm" label-width="100px">
                <el-form-item label-width="0px">
                    <el-form-item  v-if="!isEditOrg" label="上级组织">
                        <el-input v-if="!isEditOrg" disabled v-model="orgForm.parentName"  placeholder=""><el-button @click="clearParentOrg" slot="append">清空</el-button></el-input>
                        <el-input v-if="isEditOrg" disabled v-model="orgForm.parentName"  placeholder=""></el-input>


                        <span v-if="!isEditOrg">
					    	<svg-icon icon-class="info"></svg-icon>
					    	<span class="info">若上级组织为空，则新增根组织</span>
					      </span>
                    </el-form-item>
                    <el-form-item label="组织名称">
                        <el-input  v-model="orgForm.displayName"  placeholder=""></el-input>
                    </el-form-item>
               </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitOrg">确 定</el-button>
            </span>
        </el-dialog>

        <!--添加编辑成员页面-->
        <el-dialog
            :title="userTitle"
            :visible.sync="userVisible"
            width="30%"
            :before-close="handleUserClose">
            <el-col  :span="24">
                <el-input placeholder="请输入名称" clearable v-model="filterUser" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"  @click="searchUser"></el-button>
                </el-input>
            </el-col>
            <el-table
                    ref="userTable"
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        prop="fullName"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="emailAddress"
                        label="邮箱"
                >
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="userVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>

</template>
<style src="./organization.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>