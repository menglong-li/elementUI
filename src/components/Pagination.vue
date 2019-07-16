<template>
    <div style="margin-top:20px;">
        <el-pagination background @size-change="handleChange" @current-change="currentChange"
            layout="total, sizes, prev, pager, next, jumper" :current-page="current" :page-size="size"
            :page-sizes="[20, 50, 100, 200]" :total="total" v-show="total>0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        total: {required:true},//{required:true, type: Number}
        // current: {default:1},//当前页默认值
        // size: {default:20},//页面数默认值
    },
    data() {
        return {
            current: 1,
            size:20
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
        this.$emit('pageBind', {current: this.current, size: this.size});
    },
    methods: {
        handleChange(size) {
            //size 每页条数改变时会触发
            this.size = size;

            //向父组件发射页面条数改变后的状态值
            this.$emit('pageBind', {current: this.current, size: size});
        },
        currentChange(current) {
            //current 改变时会触发
            this.current = current;

            //向父组件发射当前页改变后的状态值
            this.$emit('pageBind', {current: current, size: this.size});
        }
    },
}
</script>