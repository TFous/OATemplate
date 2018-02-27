<template>
    <section style="overflow: hidden">
        <div class="loginbg">
        </div>
        <div class="loginContent">
            <!--<div class="logo"></div>-->
            <div class="login-form">
                <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="0" class="demo-ruleForm">
                    <!--用户名-->
                    <el-form-item label="" prop="userName">
                        <el-input type="text"
                                  v-model="loginForm.userName"
                                  auto-complete="off"
                                  size="small"
                                  placeholder="请输入账户"
                                  suffix-icon="el-icon-date"
                                  @focus="handleUserFocus"
                                  @blur="handleUserBlur"
                        ></el-input>
                        <ul v-show="userSaveBox" class="usernamebox">
                            <li v-for="(value, key) in userSave"
                                @click="handleSetUserMsg(value, key)"
                            >{{key}}</li>
                        </ul>
                    </el-form-item>
                    <el-input type="text"
                              v-show="false"
                    ></el-input>
                    <el-form-item label="" prop="password">
                        <el-input type="password"
                                  v-model="loginForm.password"
                                  auto-complete="off"
                                  size="small"
                                  placeholder="请输入密码"
                                  suffix-icon="el-icon-setting"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!--<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->
                        <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
                        <el-checkbox v-model="loginForm.isRemmber"><span class="checkbox-remmber">记住密码</span></el-checkbox>
                        <el-button type="primary" size="small" class="login-in" @click="login('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>
<style src="./login.scss" lang="scss" scoped></style>
