import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/views/layout';
import towLayout from '@/views/layout/tow';
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
        path: '/',
        component: layout,
        redirect: '/home',
        children: [
            {path: 'home',name: 'home',component: () => import('@/views/index'),meta: {title:'首页'}},
        ],
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        meta: {title: '登录'}
    },
    {
        path: '/404',
        meta: {title: '404'},
        component: () => import('@/views/login'),
    },
    {
        path: '/setting',
        component: layout,
        redirect: '/setting/web',
        meta: {title: '系统设置',bread:'系统设置'},
        children: [
            {path: 'web', name: 'web', component: () => import('@/views/setting/web'), meta:{title:'参数设置'}},
            {path: 'admin', name: 'admin', component: () => import('@/views/setting/admin/admin'), meta:{title:'管理员',bread:'管理员'}},
            {path: 'admin/add', name: 'add', component: () => import('@/views/setting/admin/edit'), meta:{title:'新增管理员',bread:'新增'}},
            {path: 'admin/edit/:id', name: 'edit', component: () => import('@/views/setting/admin/edit'), meta:{title:'编辑管理员',bread:'编辑'}},
        ],
    },
    {
        path: '/goods',
        component: layout,
        redirect: '/goods/list',
        meta: {title:'商品管理',bread:'商品管理'},
        children: [
            {
                path: 'type',
                meta: {title:'商品类别',bread: '商品类别'},
                component: towLayout,
                children:[
                    {path:'',name:'list',component:()=>import('@/views/goods/type'),meta:{title:'商品类别'}},
                    {path:'add',name:'add',component:()=>import('@/views/goods/type/edit'),meta:{title:'新增',bread: '新增'}},
                    {path:'edit/:id',name:'edit',component:()=>import('@/views/goods/type/edit'),meta:{title:'编辑',bread: '编辑'}},
                ]
            }
        ]
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