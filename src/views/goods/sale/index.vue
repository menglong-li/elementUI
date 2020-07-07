<template>
    <div>
        <el-row class="search-add" :gutter="10">
            <el-col :span="6">
                <el-input placeholder="账号" v-model="searchText"></el-input>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="13">
                <router-link :to="'add'">
                    <el-button type="success">新增</el-button>
                </router-link>
            </el-col>
        </el-row>
        

        <el-table :data="data" border stripe style="width: 100%" @selection-change="checkChange">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="username" label="账号">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="lasttime" label="上次登录">
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
        <div class="tableDel-Page">
            <div class="delete">
                <el-button type="danger" @click="deleteAll">删除</el-button>
            </div>
            <Pagination :params="pagin" @pageBind="getList"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    export default {
        name: 'admin',
        data() {
            return {
                searchText: '',//搜索框
                searchOn: false, //搜索开关
                data: [],
                pagin: {
                    current: 1,
                    size: 20,
                    total: 0,
                },
                checkArray:[]//check选中
            }
        },
        methods: {
            search() {//搜索
                this.pagin.current = 1;
                if (this.searchText.trim() == '') {
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
                    params.username = this.searchText;
                }
                this.$http.get('/api/admin/getlist', {params: params}).then(results => {
                    this.data = results['data']['list'];
                    this.pagin.total = results['data']['total'];
                });
            },
            Delete(index) {
                //单删
                if(confirm('确认要删除吗？')) {
                    let ID = this.data[index].id;
                    this.$http.delete('/api/admin/delete',{params:{id:ID}}).then(() => {
                        this.data.splice(index, 1);
                    })
                }
            },
            checkChange(val) {
                this.checkArray = val;
            },
            deleteAll() {
                if(confirm('确认要删除吗？')) {
                    let ids = [];
                    for(let x of this.checkArray) {
                        ids.push(x.id);
                    }
                    if(ids.length == 0) {
                        return false;
                    }
                    if(this.checkArray.length > 0) {
                        this.$http.delete('/api/admin/delete',{params:{id:ids.toString()}}).then(() => {
                            this.getList();
                        })
                    }
                }
            }
        },
        components: { Pagination }
    }
</script>