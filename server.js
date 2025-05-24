const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); // 处理 Next.js 页面路由

nextApp.prepare().then(() => {
    const app = express();

    // Express 中间件（解析 JSON 请求体）
    app.use(express.json());
    //.Express 中间件（处理cookie）
    app.use(cookieParser());

    // Session 存储用户关键信息
    app.use(
        session({
            secret: process.env.SECRET_KEY, //.session密钥 secret_key
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            }
            // 生产环境建议使用 Redis 存储
            // store: new RedisStore({ ... })
        })
    )

    // Express 路由（后端 API）
    app.get('/api/express', (req, res) => {
        res.json({ message: 'Hello from Express!' });
    });

    const router = require('./server/routes/index');
    app.use('/api1', router);

    const auth = require('./server/routes/auth.js');
    app.use('/auth', auth);

    // 所有其他请求交给 Next.js 处理（页面和原生 API 路由）
    app.all('*', (req, res) => {
        return handle(req, res);
    });

    // 启动服务器
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
