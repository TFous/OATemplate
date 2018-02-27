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
                <el-input placeholder="请输入客户端ID或者客户端名称" clearable v-model="filterText" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
                </el-input>
            </el-col>
        </div>
        <div class="content">
            <el-table
                    :data="tableData"
                    style="width: 100%"
            >
                <el-table-column
                        prop="clientId"
                        label="客户端Id"
                        >
                </el-table-column>
                <el-table-column
                        prop="clientName"
                        label="客户端名称"
                        >
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="是否启用"
                        sortable>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="showViewModel(scope.row)" size="small">编辑</el-button>
                        <el-button type="danger" plain size="small"  @click="removeClient(scope.row)">删除</el-button>
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
            width="50%"
            :before-close="handleClose">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本设置" name="first">
                    <el-form v-model="form">
                        <el-form-item label-width="0px">
                            <el-form-item label="客户端ID">
                                <el-input v-model="form.clientId" :disabled="isEdit" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="客户端名称">
                                <el-input v-model="form.clientName"  placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="认证方式">
                                <el-select v-model="form.allowedGrantTypes" placeholder="请选择">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option :key="item.value" v-for="item in dicts.grantTypes" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="RedirectUris">
                                <el-col  :span="24">
                                    <items :col="6" :itemProps="addressProps" :datas="form.redirectUris"></items>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="AllowedScopes">
                                <el-checkbox-group v-model="form.allowedScopes">
                                    <el-checkbox :key="item" v-for="item in allScopesDicts" :label="item" :name="item"></el-checkbox>
                                    <!--<el-checkbox label="个人档案" name="AllowedScopes"></el-checkbox>
                                    <el-checkbox label="邮件" name="AllowedScopes"></el-checkbox>
                                    <el-checkbox label="电话" name="AllowedScopes"></el-checkbox>
                                    <el-checkbox label="地址" name="AllowedScopes"></el-checkbox>
                                    <el-checkbox label="权限" name="AllowedScopes"></el-checkbox>
                                    <el-checkbox label="个人档案(资源服务器)" name="AllowedScopes"></el-checkbox>
                                    <el-checkbox label="offline_access" name="AllowedScopes"></el-checkbox>-->
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="PostLogoutRedirectUris">
                                <el-col  :span="24">
                                    <items :col="6" :itemProps="addressProps" :isArray="true" :datas="form.postLogoutRedirectUris"></items>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="客户端秘钥">
                                <el-col  :span="24">
                                    <items :col="4" :itemProps="clientSecretsProps" :datas="form.clientSecrets"></items>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="允许的Js客户端CORS源地址">
                                <el-col  :span="24">
                                    <items :col="6" :itemProps="addressProps" :datas="form.allowedCorsOrigins"></items>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="Claims">
                                <el-col  :span="24">
                                    <items :col="6" :itemProps="claimsProps" :datas="form.claims"></items>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="是否启用">
                                <el-checkbox v-model="form.enabled"></el-checkbox>
                            </el-form-item>
                        </el-form-item>
                    </el-form>

                </el-tab-pane>
                <el-tab-pane label="高级设置" name="second">
                    <el-form v-model="form" class="m-l-none">
                                <el-form-item label="RefreshToken时间 " label-width="260px">
                                    <el-input v-model="form.absoluteRefreshTokenLifetime" placeholder=""></el-input>
                                </el-form-item>
                            <el-form-item label="AccessToken时间" label-width="260px">
                                <el-input v-model="form.accessTokenLifetime"  placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="AccessTokenType" label-width="260px">
                                <el-select v-model="form.accessTokenType" placeholder="请选择">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option :key="item.value" v-for="(item,index) in dicts.accessTokenTypes" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="AllowAccessToAllScopes" label-width="260px">
                                <el-checkbox v-model="form.AllowAccessToAllScopes"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="AllowAccessTokensViaBrowser" label-width="260px">
                                <el-checkbox v-model="form.allowAccessTokensViaBrowser"></el-checkbox>
                            </el-form-item>
                            <!--<el-form-item label="AllowClientCredentialsOnly" label-width="260px">
                            </el-form-item>
                            <el-form-item label="AllowedCustomGrantTypes" label-width="260px">
                            </el-form-item>-->
                            <el-form-item label="AllowRememberConsent" label-width="260px">
                                <el-checkbox v-model="form.allowRememberConsent"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="AlwaysSendClientClaims" label-width="260px">
                                <el-checkbox v-model="form.alwaysSendClientClaims"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="AuthorizationCodeLifetime" label-width="260px">
                                <el-input v-model="form.authorizationCodeLifetime" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="ClientUri" label-width="260px">
                                <el-input v-model="form.clientUri" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="EnableLocalLogin" label-width="260px">
                                <el-checkbox v-model="form.enableLocalLogin"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="IdentityTokenLifetime " label-width="260px">
                                <el-input v-model="form.identityTokenLifetime" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="IncludeJwtId" label-width="260px">
                                <el-checkbox v-model="form.includeJwtId"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="LogoUri" label-width="260px">
                                <el-input v-model="form.logoUri" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="LogoutSessionRequired" label-width="260px">
                                <el-checkbox v-model="form.frontChannelLogoutSessionRequired"></el-checkbox>
                            </el-form-item>
                            <el-form-item label="LogoutUri" label-width="260px">
                                <el-input v-model="form.backChannelLogoutUri" placeholder=""></el-input>
                            </el-form-item>
                            <!--<el-form-item label="PrefixClientClaims" label-width="260px">
                                <el-checkbox v-model="form.PrefixClientClaims"></el-checkbox>
                            </el-form-item>-->
                            <el-form-item label="RefreshTokenExpiration" label-width="260px">
                                <el-select v-model="form.refreshTokenExpiration" placeholder="">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option :key="item.value" v-for="(item,index) in dicts.refreshTokenExpirations" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="RefreshTokenUsage" label-width="260px">
                                <el-select v-model="form.refreshTokenUsage" placeholder="">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option :key="item.value" v-for="(item,index) in dicts.refreshTokenUsage" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="RequireConsent" label-width="260px">
                                <el-checkbox v-model="form.requireConsent"></el-checkbox>
                            </el-form-item>
                            <!--<el-form-item label="RequireSignOutPrompt" label-width="260px">
                                <el-checkbox v-model="form.RequireSignOutPrompt"></el-checkbox>
                            </el-form-item>-->
                                <el-form-item label="SlidingRefreshTokenLifetime" label-width="260px">
                                    <el-input v-model="form.slidingRefreshTokenLifetime" placeholder=""></el-input>
                                </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </el-row>

</template>
<style src="./manager.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>