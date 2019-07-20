import Mock from 'mockjs';

var https = 'http://localhost:8090/api';

//#region 登录
var LoginIn = Mock.mock({
    'id': 1,
    'time': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'token' : '梦龙'
})

//Mock.mock('/Login/in',...)不拦截，不知道为什么非要全url，网上也没相关说明，我也不知道上哪问T.T
Mock.mock(RegExp(https + '/Login/in.*'),'get', () => {
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
Mock.mock(RegExp(https + '/news/getlist'),'get',() => {
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
Mock.mock(RegExp(https + '/setting/getweb'),'get', () => {
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

//#region 管理员

var adminList = Mock.mock({
    'list|1-100':[{
        'id|+1':1,
        'username':/^[a-zA-Z]\w{3,10}$/,
        'name': '@cname(1,3)',
        'pass': /^[a-zA-Z]\w{3,16}$/,
        'lastTime': '@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
});

Mock.mock(/\/setting\/getlist/, 'get', options => {
    console.log(adminList['list']);
    let {username, current,size} = getParams(options['url']);
    let state = (current -1) * size;
    let end = current * size;
    if(username.trim() != '') {
        adminList['list'] = adminList['list'].filter(item => {
            return item.username.toString().toLowerCase() == username.toLowerCase();
        });
    }
    let data = {
        list: adminList['list'].slice(state,end),
        total: adminList['list'].length
    }
    return data;
});

/**
 * 单删
 */
Mock.mock(/\/setting\/admin/,'delete', options => {
    let params = getParams(options.url);
    let ID = params.id;
    adminList['list'] = adminList['list'].filter(item => {
        return item.id != ID;
    });
    return adminList;
})

/**
 * 新增
 */
Mock.mock(/\/setting\/admin\/register/,'post', options => {
    let params = JSON.parse(options['body']);
    adminList['list'].unshift({'id':params.id,'name':params.name,'username':params.username,'lastTime':''});
    return true;
})

/**
 * 根据ID获取信息
 */
Mock.mock(/\/setting\/admin/,'get',options => {
    let {id} = getParams(options['url']);//let {要与传值的键名大小写一致}
    let data = adminList['list'].filter(item => {
        return item.id == id;
    });
    return data;
})

/**
 * 修改信息
 */
Mock.mock(/\/setting\/admin\/put/,'put',options => {
    let params = JSON.parse(options['body']);
    adminList['list'].filter(item => {
        if(item.id == params.id) {
            item.name = params.name;
            item.username = params.username;
        }
        return true;
    })
    return true;
})

//#endregion

/**
 * 拆解url 获得params
 * @param {String} url http
 */
function getParams(url) {
    let params = url.split('?')[1].split('&');
    let temp = {};
    if(params.length > 0) {
        for(let val of params) {
            temp[val.split('=')[0]] = val.split('=')[1];
        }
    }
    return temp;
}

export default Mock;