<template>
    <div class="">
    <el-row>
      <el-col class="card-box" :span="6" :key="menu.name" v-for="(menu,index) in menus">
          <div class="box">
              <div class="box-header primary">
                <div >{{menu.meta.title}}
                </div>
              </div>
              <div class="box-footer">
                  <p class="items" v-for="childMenu in menu.children" @click="handleOpen(menu,childMenu)"> {{childMenu.meta.title}}
                      <span class="pull-right"><svg-icon icon-class="arrow-right" /></span>
                  </p>
              </div>
          </div>
        <!--<el-card v-if="menu.meta.title">
          <div class="p primary">
            <span class="search-btn" @click="handleOpen(menu,index)">{{menu.meta.title}}</span>
          </div>
            <p v-for="childMenu in menu.children"> {{childMenu.meta.title}}</p>
        </el-card>-->
      </el-col>
    </el-row>
    </div>
</template>
<style src="./home.scss" lang="scss" scoped></style>
<style src="./../app/common.scss" lang="scss" scoped></style>