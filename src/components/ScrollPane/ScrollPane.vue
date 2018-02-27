<template>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
        <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
            <slot></slot>
        </div>
    </div>
</template>
<style src="./ScrollPane.scss" lang="scss" scoped></style>