<template>
  <el-menu class="navbar" mode="horizontal">
    <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
    <div class="hamburger-container">
      <div>
        <svg t="1492500959545" @click="toggleSideBar" class="wscn-icon hamburger" :class="{'is-active':sidebar.opened}" style="" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
          <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                p-id="1692"></path>
          <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                p-id="1693"></path>
          <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
                p-id="1694"></path>
        </svg>
      </div>
    </div>

    <div class="header">
      WUCC
    </div>
    <!--<person-menu></person-menu>
    <div class="main-change">
      <a :href="url"><svg-icon icon-class="international" /> 主页</a>
    </div>-->
    <!--<breadcrumb class="breadcrumb-container"></breadcrumb>-->
    <!--<div class="right-menu">-->
      <!--<error-log v-if="errorLogs.length>0" class="errLog-container right-menu-item" :logsList="errorLogs"></error-log>-->

      <!--<el-tooltip effect="dark" content="全屏" placement="bottom">-->
        <!--<screenfull class="screenfull right-menu-item"></screenfull>-->
      <!--</el-tooltip>-->

      <!--<el-dropdown trigger="click" class='international' @command="handleSetLanguage">-->
        <!--<div>-->
          <!--<svg-icon class-name='right-menu-item international-icon' icon-class="language" />-->
        <!--</div>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>-->
          <!--<el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->

      <!--<el-tooltip effect="dark" content="换肤" placement="bottom">-->
        <!--<theme-picker class="theme-switch right-menu-item"></theme-picker>-->
      <!--</el-tooltip>-->

      <!--<el-dropdown class="avatar-container right-menu-item" trigger="click">-->
        <!--<div class="avatar-wrapper">-->
          <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
          <!--<i class="el-icon-caret-bottom"></i>-->
        <!--</div>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<router-link to="/">-->
            <!--<el-dropdown-item>-->
              <!--首页-->
            <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <!--<a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">-->
            <!--<el-dropdown-item>-->
              <!--项目地址-->
            <!--</el-dropdown-item>-->
          <!--</a>-->
          <!--<el-dropdown-item divided>-->
            <!--<span @click="logout" style="display:block;">退出登录</span>-->
          <!--</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
    <!--</div>-->
  </el-menu>
</template>
<style src="./Navbar.scss" lang="scss"></style>

