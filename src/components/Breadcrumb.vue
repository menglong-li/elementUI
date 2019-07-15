<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
            <span v-if="item.redirect==='noRedirect'||index==levelList.length-1"
                class="no-redirect">{{ item.name }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.name }}</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'Breadcrumb',
    data() {
        return {
            levelList: null,
        }
    },
    methods: {
        getBreadcrumb() {
            this.levelList = [];
            this.$route.matched.forEach((item,index) => {
                this.levelList.push({
                    name:item.meta.title,
                    path:item.path
                });
            });
        },
        handleLink(item) {
            //点击跳转
            if(item.redirect) {
                this.$router.push(item.redirect);
                return
            }
            this.$router.push(item.path);
        }
    },
    created() {
        this.getBreadcrumb()
    },
    watch: {
        $route(route) {
            this.getBreadcrumb();
        }
    },
}
</script>