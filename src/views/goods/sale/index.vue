<template>
    <div>
        <el-row class="search-add" :gutter="10">
            <el-col :span="6">
                <el-input placeholder="账号" v-model="searchText"></el-input>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="12">
                <router-link to="/goods/sale/add">
                    <el-button type="success">新增</el-button>
                </router-link>
            </el-col>
        </el-row>
        

        <el-table :data="data" border stripe style="width: 100%" @selection-change="checkChange">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60">
            </el-table-column>
            <el-table-column prop="title" label="名称">
            </el-table-column>
            <el-table-column prop="photo" label="图片" width="100" :show-overflow-tooltip='false'>
                <template  slot-scope="scope">
                    <img :src="scope.row.photo" style="vertical-align: middle;" width="80" height="80" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="price" label="售价" width="60">
            </el-table-column>
            <el-table-column prop="inventory" label="库存" width="60">
            </el-table-column>
            <el-table-column prop="times" label="创建时间">
                <template  slot-scope="scope">
                    {{ scope.row.times | dateFormat }}
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="序号" width="60">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
                <template slot-scope="scope">
                    <el-button @click="Down(scope.$index)" type="primary" size="mini">下架</el-button>
                    <!-- <router-link :to=""> -->
                    <el-button @click="Edit(scope.row.id)" size="mini">编辑</el-button>
                    <el-button @click="Delete(scope.$index,scope.row.title)" type="danger" size="mini">删除</el-button>
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
                    params.title = this.searchText;
                }
                this.$http.get('/api/product/getlist', {params: params}).then(results => {
                    this.data = results['data']['list'];
                    this.pagin.total = results['data']['total'];
                });
            },
            Down(index) {
                //下架
                if(confirm('确认要下架该商品吗？')) {
                    let ID = this.data[index].id;
                    let title = this.data[index].title;
                    this.$http.put('/api/product/down',{id:ID,title:title}).then(() => {
                        this.data.splice(index, 1);
                    })
                }
            },
            Delete(index,title) {
                //单删
                if(confirm('确认要删除吗？')) {
                    let ID = this.data[index].id;
                    this.$http.delete('/api/product/delete',{params:{id:ID,title:title}}).then(() => {
                        this.data.splice(index, 1);
                    })
                }
            },
            Edit(id) {
                this.$router.push('/goods/sale/edit/'+id);
            },
            checkChange(val) {
                this.checkArray = val;
            },
            deleteAll() {
                if(confirm('确认要删除吗？')) {
                    let ids = [];
                    let titles = [];
                    for(let x of this.checkArray) {
                        ids.push(x.id);
                        titles.push(x.title);
                    }
                    if(ids.length == 0) {
                        return false;
                    }
                    if(this.checkArray.length > 0) {
                        this.$http.delete('/api/product/delete',{params:{id:ids.toString(),title:titles.toString()}}).then(() => {
                            this.getList();
                        })
                    }
                }
            }
        },
        components: { Pagination }
    }
</script>