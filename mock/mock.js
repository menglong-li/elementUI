import Mock from 'mockjs';

var https = 'http://localhost:8090/api';

var LoginIn = Mock.mock({
    'id': 1,
    'time': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'token' : '梦龙'
})

//Mock.mock('/Login/in',...)不拦截，不知道为什么非要全url，网上也没相关说明，我也不知道上哪问T.T
Mock.mock(RegExp(https + '/Login/in.*'),'get', options => {
    return LoginIn;
});
export default Mock;