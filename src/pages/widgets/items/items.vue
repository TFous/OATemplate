<template>

    <el-row>
        <el-form label-width="0px" class="demo-dynamic">
            <el-form-item>
                <el-col :span="col" v-for="(item,index) in itemProps" :key="item.key"><span class="font-weight">{{item.title}}</span></el-col>
                <el-col :span="col"> <el-button type="danger"  class="btn-icon"  plain @click.prevent="addDomain()"> <i class="iconfont icon-add"></i> </el-button></el-col>
            </el-form-item>
            <el-form-item v-for="(data,index) in datas" :key="data.key">
                <el-col :span="col" class="p-r" v-for="(item,index) in itemProps" :key="item.key">

                    <template v-if="item.type ==='date'">
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <div class="block">
                                <el-date-picker
                                        :clearable="true"
                                        :editable="false"
                                        v-model="data[item.key]"
                                        type="date"
                                        placeholder="选择日期"
                                >
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </template>
                    <template v-else-if="item.type ==='datetime'">
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <div class="block">
                                <el-date-picker
                                        :clearable="true"
                                        :editable="false"
                                        v-model="data[item.key]"
                                        type="datetime"
                                        placeholder="选择日期"
                                >
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </template>
                    <template v-else-if="item.type ==='select'">
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <el-select :clearable="true" v-model="data[item.key]" placeholder="请选择">
                                <el-option
                                        v-for="a in item.selects"
                                        :key="a.value"
                                        :label="a.text"
                                        :value="a.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                    <template v-else-if="item.type ==='number'">
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <el-input-number v-model="data[item.key]" :controls="false"></el-input-number>
                            <!--<el-input
                                    :clearable="true"
                                    value="number"
                                    v-model="data[item.key]"
                                    placeholder=""
                            ></el-input>-->
                        </el-form-item>
                    </template>
                    <template v-else-if="item.type ==='checkbox'">
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <el-checkbox
                                    :clearable="true"
                                    v-model="data[item.key]"
                                    placeholder=""
                            >{{item.text}}</el-checkbox>
                        </el-form-item>
                    </template>
                    <template v-else-if="item.type ==='date'">
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <el-date-picker
                                    v-model="data[item.key]"
                                    type="date"
                                    placeholder="">
                            </el-date-picker>
                        </el-form-item>
                    </template>
                    <template v-else-if="item.type ==='textarea'">
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <el-input
                                    :clearable="true"
                                    type="textarea"
                                    v-model="data[item.key]"
                                    placeholder=""
                            ></el-input>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item
                                :prop="item.key"
                                :rules="item.rules"
                        >
                            <el-input
                                    :clearable="true"
                                    v-model="data[item.key]"
                                    placeholder=""
                            ></el-input>
                        </el-form-item>
                    </template>
                </el-col>
                <el-col :span="col">
                    <el-button @click.prevent="removeDomain(data)">删除</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </el-row>


</template>
<style src="./items.scss" lang="scss"></style>
<style src="./../../app/common.scss" lang="scss" scoped></style>