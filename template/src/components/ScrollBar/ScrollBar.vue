<template>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll" >
        <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
            <slot></slot>
        </div>
    </div>
</template>
<style src="./ScrollBar.scss" lang="scss" scoped></style>