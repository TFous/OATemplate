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
                    <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
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
                        prop="enabled"
                        label="启用"
                >
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="说明"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="showViewModel(scope.row)" size="small">编辑</el-button>
                        <el-button type="danger" plain size="small" @click="removeApi(scope.row)">删除</el-button>
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


        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="65%"
            :before-close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-form v-model="form">
                        <el-form-item label-width="0px">
                            <el-form-item label="名称" label-width="100px">
                                <el-input v-model="form.name" :disabled="isEdit" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="显示名称" label-width="100px">
                                <el-input v-model="form.displayName"  placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="启用" label-width="100px">
                                <el-checkbox v-model="form.enabled"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="必须" label-width="100px">
                                <el-checkbox v-model="form.required"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="说明" label-width="100px">
                                <el-input v-model="form.description" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="强调" label-width="100px">
                                <el-checkbox v-model="form.emphasize"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="" label-width="100px">
                                <el-checkbox v-model="form.showInDiscoveryDocument"><b>显示在发现文档中</b></el-checkbox>
                            </el-form-item>
                            <el-form-item label="userClaims" label-width="100px">
                                <el-input v-model="form.userClaims" placeholder=""></el-input>
                                <svg-icon icon-class="info"></svg-icon> 多个规则以，隔开
                            </el-form-item>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="scopes" name="second">
                    <items :col="3" :itemProps="scopesProps" :datas="form.scopes"></items>
                </el-tab-pane>
                <el-tab-pane label="apiSecrets" name="third">
                    <items :col="4" :itemProps="apiSecretsProps" :datas="form.apiSecrets"></items>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </el-row>

</template>
<style src="./ApiResource.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>