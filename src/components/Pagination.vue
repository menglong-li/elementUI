<template>
    <el-pagination background @size-change="handleChange" @current-change="currentChange"
        layout="total, sizes, prev, pager, next, jumper" :current-page="params.current" :page-size="params.size"
        :page-sizes="[20, 50, 100, 200]" :total="params.total" v-show="params.total>0">
    </el-pagination>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        params: {
            total:{default:0},
            current:1,
            size: {default:20}
        }
    },
    data() {
        return {
        }
    },
    computed: {
        //computed:能够监听vue数据上的变化，页面上来就执行一次，每改变一次数据就又触发。在操作数据的时候，会派生出另一个事情
        //利用第一次触发，向父组件发射初始值，用于父组件列表第一次请求
        // current: {
        //     get() {
        //         return this.current;
        //     },
        //     set(val) {
        //         this.$emit('update:current',val);//发射了
        //     }
        // },
        // size: {
        //     get() {
        //         return this.size;
        //     },
        //     set(val) {
        //         this.$emit('update:size',val);
        //     }
        // }
    },
    created() {
        this.$emit('pageBind');
    },
    methods: {
        handleChange(size) {
            if (this.params.current * size > this.params.total) { 
                //防止请求两次
                this.params.current = 1;
            }
            //size 每页条数改变时会触发
            this.params.size = size;
            //向父组件发射页面条数改变后的状态值
            this.$emit('pageBind');
        },
        currentChange(current) {
            //current 改变时会触发
            this.params.current = current;
            //向父组件发射当前页改变后的状态值
            this.$emit('pageBind');
        }
    },
}
</script>

<style scope>
.el-pagination{margin-top:20px;}
</style>