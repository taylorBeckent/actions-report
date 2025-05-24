const jwt = require('jsonwebtoken');

//.校验 Session+JWT
const authenticate = (req, res, next) => {
    console.log(req.headers)
    console.log(req.headers.authorization.split(" "));
    //.优先从cookie中读取JWT
    const token = req.cookie?.access_token || req.headers.authorization?.split(" ")[1] || req.headers.Authorization?.split(" ")[1];
    console.log('token', token);
    if (!token) {
        return res.status(401).json({
            retCd: '401',
            message: '未授权，缺少Cookie'
        })
    };

    // 验证 JWT
    // const decode = jwt.verify(token, process.env.JWT_SECRET);
    const decode = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('token已失效');
        return user;
    });
    // 验证 Session 中用户的信息
    if (!req.session.user || req.session.user.id !== decode.id) {
        return res.status(401).json({
            retCd: '401',
            message: '会话已过期'
        })
    };

    // 附加用户信息到请求对象
    req.user = req.session.user;
    next();
    // try {
    // } catch (err) {
    //     res.status(401).json({
    //         retCd: '401',
    //         message: '认证失败',
    //         errMsg: err
    //     })
    // }
}

module.exports = authenticate;


