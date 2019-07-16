<template>
    <div>
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
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button @click="Delete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="data.total" @pageBind="getList"></Pagination>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
    export default {
        name: 'admin',
        data() {
            return {
                data: []

            }
        },
        // created() {
        //     this.getList();
        // },
        methods: {
            getList(pageInfo) {
                let params = {
                    params: {
                        current: pageInfo.current,
                        size: pageInfo.size
                    }
                }
                //触发loading.....
                this.$http.get('/api/setting/getlist',params).then(data => {
                    this.data = data['data'];
                });
            },
            Delete(index) {
                let ID = this.data.list[index].id;
                this.$http.delete('/api/setting/admin?id='+ID).then(data => {
                    this.data['list'].splice(index,1);
                })
            }
        },
        components:{Pagination}
    }
</script>