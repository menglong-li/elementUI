<template>
    <div>
        <el-row class="search-add" :gutter="20">
            <el-col :span="6">
                <el-input placeholder="用户名" v-model="searchText"></el-input>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-col>
        </el-row>

        <el-table :data="data" border stripe style="width: 100%" @selection-change="checkChange">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="150">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="times" label="注册时间">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if='scope.row.state == 1'>
                        <p>冻结时间: {{ scope.row.icetime }}</p>
                        <div slot="reference">
                        <el-tag size="medium">{{ scope.row.state | format}}</el-tag>
                        </div>
                    </el-popover>
                    <div v-else>{{scope.row.state | format}}</div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.state == 0" @click="Ice(scope.$index)" type="text" size="small">冻结</el-button>
                    <el-button v-else @click="Thaw(scope.$index)" type="text" size="small">解冻</el-button>
                    <el-button @click="Delete(scope.$index)" type="text" size="small">删除</el-button>
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
        filters:{
            format:(value) => {
                switch(value) {
                    case 0:
                        return '正常';
                        break;
                    case 1:
                        return '冻结';
                        break;
                }
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
                     this.searchText == '' ? '': params.username = this.searchText;
                }
                this.$http.get('/api/users/getlist', {params}).then(results => {
                    this.data = results['data']['data'];
                    this.pagin.total = results['data']['total'];
                });
            },
            Ice(index) {
                //冻结
                if(confirm('确认要冻结吗？')) {
                    let ID = this.data[index].id;
                    let username = this.data[index].username;
                    this.$http.put('/api/users/ice',{id:ID,username:username}).then(() => {
                        this.data[index].state = 1;
                        let year = new Date().getFullYear();
                        let month = new Date().getMonth() + 1;
                        let date = new Date().getDate();
                        let HH = new Date().getHours();
                        let mm = new Date().getMinutes();
                        let SS = new Date().getSeconds();
                        this.data[index].icetime = year + '-' + month + '-' + date + ' ' + HH + ':' + mm + ':' + SS;
                    })
                }
            },
            Thaw(index) {
                //冻结
                if(confirm('确认要解冻吗？')) {
                    let ID = this.data[index].id;
                    let username = this.data[index].username;
                    this.$http.put('/api/users/thaw',{id:ID,username:username}).then(() => {
                        this.data[index].state = 0;
                    })
                }
            },
            Delete(index) {
                //单删
                if(confirm('确认要删除吗？')) {
                    let ID = this.data[index].id;
                    let username = this.data[index].username;
                    this.$http.delete('/api/users/delete',{params:{id:ID,username:username}}).then(() => {
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
                    let username = [];
                    for(let x of this.checkArray) {
                        ids.push(x.id);
                        username.push(x.username);
                    }
                    if(ids.length == 0) {
                        return false;
                    }
                    if(this.checkArray.length > 0) {
                        this.$http.delete('/api/users/delete',{params:{id:ids.toString(),username:username.toString()}}).then(() => {
                            this.getList();
                        })
                    }
                }
            }
        },
        components: { Pagination }
    }
</script>