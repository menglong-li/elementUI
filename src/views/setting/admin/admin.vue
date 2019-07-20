<template>
    <div>
        <el-row class="search-add" :gutter="10">
            <el-col :span="6"><el-input placeholder="账号" v-model="searchText"></el-input></el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="13">
                <router-link :to="'/setting/admin/add'">
                    <el-button type="success">新增</el-button>
                </router-link>
            </el-col>
        </el-row>

        <el-table :data="data.list" border style="width: 100%">
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="username" label="账号">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="lastTime" label="上次登录">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <router-link :to="'/setting/admin/edit/'+scope.row.id">
                        <el-button type="text" size="small">编辑</el-button>
                    </router-link>
                    <el-button @click="Delete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="data.total" @pageBind="getList"></Pagination>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination';
    export default {
        name: 'admin',
        data() {
            return {
                searchText: '',//搜索框
                data: [],
                pageInfo: {
                    current: 0,
                    size:0,
                    username:'',
                }
            }
        },
        methods: {
            search() {//搜索
                if(this.searchText.trim() != '') {
                    let {current,size} = Pagination.data();//分页初始值
                    this.pageInfo.username = this.searchText;
                    this.getList(this.pageInfo);
                }
            },
            getList(pageInfo) {
                //数据绑定
                this.pageInfo.current = pageInfo.current;
                this.pageInfo.size = pageInfo.size;
                let params = {
                    params: this.pageInfo
                }
                this.$http.get('/api/setting/getlist',params).then(data => {
                    this.data = data['data'];
                });
            },
            Delete(index) {
                //单删
                let ID = this.data.list[index].id;
                this.$http.delete('/api/setting/admin?id='+ID).then(data => {
                    this.data['list'].splice(index,1);
                })
            }
        },
        components:{Pagination}
    }
</script>