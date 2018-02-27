<template>
    <scroll-bar>
        <el-menu mode="vertical" :default-active="$route.path" :collapse="!sidebar.opened" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
            <sidebar-item :routes="permission_routers"></sidebar-item>
        </el-menu>
    </scroll-bar>
</template>
<style src="./Sidebar.scss" lang="scss"></style>