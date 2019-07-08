import Mock from 'mockjs';

var LoginIn = Mock.mock({
    'id': 1,
    'time': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'menglong' : '梦龙'
})

//Mock.mock('/Login/in',...)不拦截，不知道为什么非要全url，网上也没相关说明，我也不知道上哪问T.T
Mock.mock('http://localhost:8080/Login/in','get',(res,req) => {
    console.log('进入');
    return {
        success: true,
        data: LoginIn,
        msg: '成功'
    }
});
export default Mock;