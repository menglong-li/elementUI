import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/views/layout';
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
        component: () => import('@/views/login'),
    },
    {
        path: '/',
        component: layout,
        redirect: '/home',
        children: [
            {path: 'home',name: 'home',component: () => import('@/components/HelloWorld'),meta: {title:'首页'}},
        ],
    },
    {
        path: '/setting',
        component: layout,
        redirect: '/setting/web',
        children: [
            {path: 'web', name: 'web', component: () => import('@/views/setting/web'), meta:{title:'参数设置'}},
            {path: 'admin', name: 'admin', component: () => import('@/views/setting/admin'), meta:{title:'管理员'}},
        ],
    },
    { path: '*', redirect: '/login' }
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