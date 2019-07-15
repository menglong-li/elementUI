<template>
    <div style="margin-top:20px;">
        <el-pagination background @size-change="handleChange" @current-change="currentChange"
            layout="total, sizes, prev, pager, next, jumper" :current-page="currentPage" :page-size="pageSize"
            :page-sizes="[20, 50, 100, 200]" :total="total" v-show="total>0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        total: {required:true}//{required:true, type: Number}
    },
    data() {
        return {
            currentPage: 1,//当前页码
            pageSize: 20,//页面数
        }
    },
    computed: {
        //computed:能够监听vue数据上的变化，页面上来就执行一次，每改变一次数据就又触发。在操作数据的时候，会派生出另一个事情
        //利用第一次触发，向父组件发射初始值，用于父组件列表第一次请求
    },
    created() {
        this.$emit('pageBind', {current: this.currentPage, size: this.pageSize});
    },
    methods: {
        handleChange(size) {
            //pageSize 每页条数改变时会触发
            this.pageSize = size;

            //向父组件发射页面条数改变后的状态值
            this.$emit('pageBind', {current: this.currentPage, size: size});
        },
        currentChange(current) {
            //currentPage 改变时会触发
            this.currentPage = current;

            //向父组件发射当前页改变后的状态值
            this.$emit('pageBind', {current: current, size: this.pageSize});
        }
    },
}
</script>