<template>

    <el-row>
        <div class="row">
            <el-col  :span="12">
                <div class="title">
                    权限结构树
                    <div class="title-tools">
                        <el-tooltip class="item" effect="dark" content="新增子权限" placement="top-start">
                            <el-button type="primary" plain @click="showModel" size="mini"><svg-icon icon-class="add"></svg-icon> </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑权限" placement="top-start">
                            <el-button type="success" plain @click="showEditModel" size="mini"><svg-icon icon-class="edit"></svg-icon> </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除权限" placement="top-start">
                            <el-button type="danger" plain @click="removePerm" size="mini"><svg-icon icon-class="delete"></svg-icon> </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="ibox">
                    <span>客户端：</span>
                    <el-select class="client-select" v-model="client" @change="changeCilent" clearable placeholder="请选择">
                        <el-option :key="item.clientId" v-for="item in clientList" :label="item.clientName" :value="item.clientId"></el-option>
                    </el-select>
                    <tree  class="p-t" :data="treeData" ref="orgRef" :searchShow="true" inputClass="input-small" :isExpandAll="true" :isShowBox="false"  v-on:nodeChanged="onNodeChanged" ></tree>

                </div>


            </el-col>

        </div>
        <!--添加权限组织页面-->
        <el-dialog
                :title="orgTitle"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">

            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label-width="0px">
                    <el-form-item label="上级权限">
                        <el-input  v-if="!isEditOrg" disabled v-model="parentName"  placeholder=""><el-button @click="clearParentNode" slot="append">清空</el-button></el-input>
                        <el-input v-if="isEditOrg" disabled v-model="parentName"  placeholder=""></el-input>


                        <span v-if="!isEditOrg">
					    	<svg-icon icon-class="info"></svg-icon>
					    	<span class="info">若上级权限为空，则新增根权限</span>
					      </span>
                    </el-form-item>
                    <el-form-item label="客户端Id">
                        <el-input disabled v-model="form.clientId"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input  v-model="form.name" :disabled="isEditOrg"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="显示名称">
                        <el-input  v-model="form.displayName"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input  v-model="form.description"  placeholder=""></el-input>
                    </el-form-item>
               </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPerm">确 定</el-button>
            </span>
        </el-dialog>

    </el-row>

</template>
<style src="./permission.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>