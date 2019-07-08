import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Login from '../views/login'

Vue.use(Router)

/**
 * 路由
 * hidden       侧边栏是否隐藏,默认为false
 */
export const urlRouters = [
{
    path: '/',
    component: Login
},
{path: '*', component: HelloWorld}
];


const createRouter = () => new Router({
    routes:urlRouters,
    scrollBehavior: () => ({y:0})//在切换路由页面时，期望滚动条停留的位置
});

const router = createRouter()

export default router