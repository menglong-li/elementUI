<template>
    <div>
        <el-row class="search-add" :gutter="20">
            <el-col :span="6">
                <el-input placeholder="账号" v-model="searchText"></el-input>
            </el-col>
            <el-col style="width: 180px; margin-right: 15px;">
                <el-date-picker
                    style="width: 180px;"
                    v-model="times"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-col>
        </el-row>

        <el-table :data="data" border stripe style="width: 100%">
            <el-table-column prop="admin" label="管理员" width="150">
            </el-table-column>
            <el-table-column prop="logs" label="日志">
            </el-table-column>
            <el-table-column prop="times" label="时间">
            </el-table-column>
        </el-table>
        <div class="tableDel-Page">
            <Pagination :params="pagin" @pageBind="getList"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    export default {
        data() {
            return {
                searchText: '',//搜索框
                times: '',
                searchOn: false, //搜索开关
                data: [],
                pagin: {
                    current: 1,
                    size: 20,
                    total: 0,
                }
            }
        },
        methods: {
            search() {//搜索
                this.pagin.current = 1;
                if (this.searchText.trim() == '' && this.times == '') {
                    this.searchOn = false;
                    this.getList();
                }else {
                    this.searchOn = true;
                    this.getList();
                }
            },
            getList() {
                //数据绑定
                let params = {
                    current: this.pagin.current,
                    size: this.pagin.size,
                }
                if(this.searchOn == true) {
                     this.searchText == '' ? '': params.admin = this.searchText;
                     this.times == '' ? '' : params.times = this.times;
                }
                this.$http.get('/api/adminlogs/getlist', {params: params}).then(results => {
                    this.data = results['data']['data'];
                    this.pagin.total = results['data']['total'];
                });
            }
        },
        components: { Pagination }
    }
</script>