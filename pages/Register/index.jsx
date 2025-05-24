import React, {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import styles from './index.module.css';
import axios from "axios";

const Register = () => {
    const router = useRouter();
    const [ inputs, setInputs ] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value  }));
    };

    const handleSubmit = async e => {
        console.log(inputs);
        e.preventDefault();
        if(!inputs.email) return alert('请输入邮箱');
        if (!inputs.username) return alert('请输入用户名');
        if (!inputs.password) return alert('请输入密码');

        const res = await axios({
            method: 'POST',
            url: 'auth/register',
            data: inputs,
        });
        console.log(res);
        if(res.status === 200){
            const { retCd, message } = res?.data;
            if (retCd === '000000') {
                // router.push('/home');
                alert(message);
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
                    <h4> 注 册 </h4>
                    <form>
                        <input className={styles["acc"]} type="email" name="email" placeholder="请输入邮箱" onChange={handleChange}/>
                        <input className={styles["acc"]} type="username" name="username" placeholder="请输入用户名" onChange={handleChange}/>
                        <input className={styles["acc"]} type="password" name="password" placeholder="请输入密码" onChange={handleChange}/>
                        <button className={styles["submit"]} type="button" placeholder="login" onClick={handleSubmit}>注册</button>
                    </form>
                    <div className={styles["fn"]}>
                        <a href="javascript:">已有账号？去登陆</a>
                        <a href="javascript:">找回密码</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
