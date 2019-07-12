import axios from 'axios';
import router from '../router';
import store from '@/store/store.js';

//是否允许跨域
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API,//请求URL前缀
    timeout: 10000,//超时时间
    headers:{//即将被发送的自定义请求头
        
    }
});

//请求拦截器
instance.interceptors.request.use(config => {
    //在发送请求之前做某事
    if(store.getters.isLogin) {
        console.log(config);
        // config.headers.common['Authorization'] = 'Bearer ' + store.state.token;
        config.headers.common['Authorization'] = 'Bearer eyJpc3MiOiJKb2huI.eyJpc3MiOiJ.Kb2huIFd1IEp';
    }
    return config;
}, error => {
    //请求错误时做某事
    return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use(response => {
    
    return response;
},error => {
    if(error.response && error.response.status == 404) {
        router.push('/404.vue');
    }

    return Promise.reject(error);
});

export default instance