import React, {useState, useEffect} from 'react';
// import {message} from "antd";
import {useRouter} from "next/navigation";
import styles from './index.module.css';
import axios from "axios";

const Login = () => {
    const router = useRouter();
    const [ inputs, setInputs ] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        console.log(inputs);
        e.preventDefault();
        if (!inputs.username) {
            // return message.error('请输入用户名');
            // return console.log('请输入用户名');
            return alert('请输入用户名');
        }
        if (!inputs.password) {
            // return console.log('请输入密码');
            return alert('请输入密码');
            // return message.error('请输入密码');
        }
        const res = await axios({
            method: 'POST',
            url: 'auth/login',
            data: inputs,
        });
        console.log(res);
        if(res.status === 200){
            const { retCd, message } = res?.data;
            if (retCd === '000000') {
                router.push('/deepSeek')
            } else {
                alert(message);
            }
        }else {
            alert(res?.response?.data?.message)
        }
    }

    return (
        <div className={styles["login"]}>
            <div className={styles["box"]}>
                <div className={styles["left"]}>

                </div>
                <div className={styles["right"]}>
                    <h4> 登 陆 </h4>
                    <form>
                        <input className={styles["acc"]} type="username" name="username" placeholder="请输入用户名"
                               onChange={handleChange}/>
                        <input className={styles["acc"]} type="password" name="password" placeholder="请输入密码"
                               onChange={handleChange}/>
                        <input className={styles["submit"]} type="submit" placeholder="login" onClick={handleSubmit}/>
                    </form>
                    <div className={styles["fn"]}>
                        <a href="javascript:">注册账号</a>
                        <a href="javascript:">找回密码</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
