<template>
    <div :class="['user', {userselect: messageShow}]" @click="personShow">
        <span class="person-icon"></span>
        <span class="user-name">{{ user.profile.FullName }}</span>
        <div class="person-messageShow" v-show="messageShow">
            <div class="person-message">
                <span class="person-image"></span>
                <p class="person-userFullName">
                    {{user.profile.FullName}}
                </p>
                <p class="person-SalesDepartment">
                    <small>{{user.profile.SalesDepartment}}</small>
                </p>
            </div>
            <div class="person-button">
                <el-button type="primary" @click="show=true" class="person-password" >
                    <svg-icon icon-class="password" />
                    修改密码
                </el-button>
                <el-button  class="person-layout"  @click="logout">
                    退出
                </el-button>
            </div>
        </div>

        <template>
            <el-dialog
                    title="修改密码"
                    :visible.sync="show"
                    width="30%"
                    :model="show"
                    >
                <div>
                    <el-form label-position="right" label-width="80px" :model="formCustom" :rules="rules" ref="passwordForm">
                        <el-form-item label="旧密码" prop="OldPassword">
                            <el-input v-model="formCustom.OldPassword" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="NewPassword">
                            <el-input v-model="formCustom.NewPassword" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="passwdCheck">
                            <el-input v-model="formCustom.passwdCheck" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="show=false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('passwordForm')">确 定</el-button>
                </span>
            </el-dialog>
        </template>
    </div>
</template>
<style src="./personMenu.scss" lang="scss" scoped></style>