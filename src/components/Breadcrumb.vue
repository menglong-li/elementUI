<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
            <span v-if="index==levelList.length-1 || nowUrl == item.path"
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
            nowUrl: this.$route.fullPath,
        }
    },
    methods: {
        getBreadcrumb() {
            this.levelList = [];
            this.$route.matched.forEach((item) => {
                if(item.path === '/home') {
                    //防止面包屑默认首页重复
                    this.levelList = [];
                    return false;
                }
                if(!item.meta.hasOwnProperty('no')) {
                    this.levelList.push({
                        name:item.meta.title,
                        path:item.path,
                    });
                }
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
        $route() {
            this.nowUrl = this.$route.fullPath;
            this.getBreadcrumb();
        }
    },
}
</script>
<style>
    .el-breadcrumb{display: inline-block;}
    @media screen and (max-device-width:414px) {
        .el-header{padding: 0 10px;}
        .el-header .el-breadcrumb{margin-left: 0px!important;}
    }
</style>