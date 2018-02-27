<template>
    <div class="dictionaries">

        <el-row :gutter="20">
            <el-col :span="5">
                <h3 class="pageTit">数据字典</h3>
                <ul class="dictionaries-ul">
                    <li v-for="item in dictionariesName" @click="showDic(item)"> {{item.Name}}</li>
                </ul>
            </el-col>
            <el-col :span="19">
                <div v-show="isSelect">
                    <h3 class="pageTit">{{nowTitle}}</h3>
                    <xheaderBar
                        :options="options"
                        :headerFn="headerFn"
                    >
                    </xheaderBar>
                    <xtable
                        :tableFn="tableFn"
                        :options="options"
                    ></xtable>
                    <xpagers
                        :options="options"
                    ></xpagers>
                    <xadd
                        :addFn="addFn"
                        :options="options"
                    ></xadd>
                    <xedit
                        :editFn="editFn"
                        :options="options"
                    ></xedit>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style src="./dictionaries.scss" lang="scss" scoped></style>
