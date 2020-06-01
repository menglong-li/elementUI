import axios from 'axios';
import router from '../router';
import store from '@/store/store.js';
import Loading from 'element-ui';

//是否允许跨域
axios.defaults.withCredentials = true;//允许携带cookies信息
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
        config.headers.common['Authorization'] = store.state.token;
        // config.headers.common['Authorization'] = 'Bearer eyJpc3MiOiJKb2huI.eyJpc3MiOiJ.Kb2huIFd1IEp';
        startLoading();
    }
    return config;
}, error => {
    //请求错误时做某事
    return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use(response => {
    if(store.getters.isLogin) {
        endLoading();
    }
    return response;
},error => {
    if(error.response && error.response.status == 400) {
        //语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求
        //请求参数有误。
        alert(error.response.data);
        endLoading();
    }
    if(error.response && error.response.status == 403) {
        //token验证失败专用
        alert(error.response.data);
        endLoading();
        store.commit('loginOut');
    }
    if(error.response && error.response.status == 404) {
        router.push('/404.vue');
    }
    

    return Promise.reject(error);
});

export default instance

let loading;
function startLoading() {
    loading = Loading.Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}