import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Login from '../views/login';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import store from '@/store/store.js';

Vue.use(Router)

/**
 * 路由
 * hidden       侧边栏是否隐藏,默认为false
 */
export const urlRouters = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/404',
        component: Login
    },
    {
        path: '/',
        component: () => import('@/views/layout')
        
    },
    { path: '*', component: HelloWorld }
];


const router = new Router({
    mode: 'history',  //去掉url中的#
    routes: urlRouters,
    scrollBehavior: () => ({ y: 0 })//在切换路由页面时，期望滚动条停留的位置
});

//增加路由守卫
router.beforeEach((to, from, next) => {
    NProgress.start();//开启路由跳转进度条
    document.title = to.meta.title;//页面标题
    if(store.getters.isLogin) {
        if(to.path === '/login') {
            next('/');
        }else {
            next();
        }
    }else{
        if(to.path === '/login') {
            next();
        }else {
            next('/login');
        }
    }
    NProgress.done();
});

export default router