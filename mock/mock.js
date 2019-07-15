import Mock from 'mockjs';

var https = 'http://localhost:8090/api';

//#region 登录
var LoginIn = Mock.mock({
    'id': 1,
    'time': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'token' : '梦龙'
})

//Mock.mock('/Login/in',...)不拦截，不知道为什么非要全url，网上也没相关说明，我也不知道上哪问T.T
Mock.mock(RegExp(https + '/Login/in.*'),'get', options => {
    return LoginIn;
});
//#endregion

//#region 新闻列表

/**
 * 新闻数据
 */
var newslist = Mock.mock({
    'list|1-20':[{
        'id|+1':1,
        'title':Mock.Random.cparagraph(1,3)
    }]
});
/**
 * 新闻api监听
 */
Mock.mock(RegExp(https + '/news/getlist'),'get',options => {
    return newslist;
})
//#endregion

//#region 参数设置
var webset = {
    title: '初始化',
    keys: '',
    des: '',
}

/**
 * 请求数据
 */
Mock.mock(RegExp(https + '/setting/getweb'),'get', options => {
    return webset;
})

/**
 * 更新
 */
Mock.mock(RegExp(https + '/setting/put'), 'put',options => {
    webset = JSON.parse(options['body']);
    return webset;
})
//#endregion

export default Mock;