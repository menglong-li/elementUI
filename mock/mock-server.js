let express = require('express');
let Mock = require('mockjs');
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/Login/in',(res,req) => {
    var LoginIn = Mock.mock({
        'id': 1,
        'time': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    });
    console.log(res.json(LoginIn));
})

app.listen('8090',() => {
    console.log('监听8090端口');
})