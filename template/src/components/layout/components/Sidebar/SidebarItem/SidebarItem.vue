<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden&&item.children">
            <template v-if="item.children.length===1" v-for="child in item.children">
                <router-link :to="item.path+'/'+child.path" :key="child.name">
                    <el-menu-item :index="item.path+'/'+child.path" class='submenu-title-noDropdown'>
                        <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                        <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                    </el-menu-item>
                </router-link>
            </template>

            <el-submenu v-else :index="item.name||item.path" :key="item.name">
                <template slot="title">
                    <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                    <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

                    <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                            <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>
<style src="./SidebarItem.scss" lang="scss"></style>
