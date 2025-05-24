// import {db} from '../utils/database';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
const db = require('../utils/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    // CHECK EXITSING USER;
    const q = "SELECT * FROM user_info WHERE email = ? OR username = ?";
    db.query(q, [ req.body.email, req.body.username ], (err, data) => {
        console.log('入参查询', req.body);
        console.log('查重', err, data);
        if (err) return res.json(err);
        if (data.length) return res.status(409).json({
            retCd: '409',
            message: 'user already exists!'
        });

        // Hash the password and create a user;
        const salt = bcrypt.genSaltSync(10);
        console.log('salt',salt);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log('hash',hash);

        const registerSql = "INSERT INTO user_info (`email`, `username`, `password`, `role`) VALUES (?)";
        const values = [
            req.body.email,
            req.body.username,
            hash,
            req.body.role || 'user'
        ];

        db.query(registerSql, [ values ], (err, data) => {
            console.log('注册写表',err, data)
            if (err) return res.json(err);
            return res.status(200).json({
                retCd: '000000',
                message: '注册成功！'
            });
        })
    })
}

const login = (req, res) => {
    const q = "SELECT * FROM user_info WHERE username = ?";
    db.query(q, [ req.body.username || '测试名称' ], (err, data) => {
        console.log('登陆查询', err, data);
        if (err) {
            return res.status(401).json({
                retCd: '401',
                message: err
            })
        }
        if(data.length === 0){
            return res.status(401).json({
                retCd: '401',
                message: '账号不存在，请检查账号是否输入正确'
            })
        }

        // 1. 验证用户名密码
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(401).json({
            retCode: '401',
            message: '用户名/密码错误，请重新输入！'
        });

        // 2. 生成 JWT
        const token = jwt.sign(
            { id: data[0].id },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPRIES_IN}
        );
        const { password, ...other } = data[0];

        // 3. 将用户信息存入 Session（服务端存储敏感数据）
        req.session.user = {
            id: data[0].id,
            role: data[0].role,
            // token   //. 将 JWT 存入 Session
        }

        // 4. 将 JWT 通过 Authorization 设置响应头
        res.header('Authorization', `Bearer ${token}`);

        // 5. 将 JWT 通过 Cookie 发送到客户端
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
        }).status(200).json({
            retCd: '000000',
            message: '登陆成功！',
            data: other
        });
    })
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).send("登出失败");
        };
    });

    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({
        retCd: '000000',
        message: '登出成功！'
    });
}

module.exports = { register, login, logout };
