<template>
    <section class="app-main" style="min-height: 100%">
        <transition name="fade" mode="out-in">
            <!--<keep-alive>-->
                <!--<router-view></router-view>-->
            <!--</keep-alive>-->
            <router-view></router-view>
        </transition>
    </section>
</template>
<style src="./appMain.scss" lang="scss"></style>
