const express = require('express');
const authMiddleware = require('../middlewares/auth');

//.创建路由对象
const router = express.Router();

router.post('/testApi', (req, res) => {
    // res.send({
    //     meta: { code: 200, msg: '测试成功' },
    //     data: { img_url: 'testApi Success' }
    // });
    res.json({ message: 'Hello from Express!' });
});

//.需要登陆的接口
router.post('/profile', authMiddleware, (req, res) => {
    res.send(`欢迎回来, ${req.user.id}`);
})

//.需要特定角色的接口
router.post('/admin', authMiddleware, (req, res) => {
    if(req.user.role !== 'admin'){
        return res.status(403).send('权限不足');
    }
    res.send("管理员面板");
})

module.exports = router;
