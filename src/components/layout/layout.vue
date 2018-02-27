<template>
    <div class="app-wrapper">
        <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <Navbar></Navbar>
            <tag-views></tag-views>
            <app-main></app-main>
        </div>
        </div>
    </div>
</template>
<style src="./layout.scss" lang="scss"></style>

