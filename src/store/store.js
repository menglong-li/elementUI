import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        token: localStorage.getItem('token') || '',
    },
    mutations:{//动作事件
        loginIn(state,token) {//登录
            localStorage.setItem('token',token);
            state.token = token;
        },
        loginOut(state) {//退出
            localStorage.clear();
            state.token = '';
            router.push('/');
        }

    },
    actions:{//异步

    },
    getters:{
        isLogin: state => !!state.token//监听token变化
    },
});

export default store