import React from 'react';
import {myAxios} from "../../libs/axios";
// import Message from '../../src/components/Message';

interface loginParams<T = any> {
    username: string,
    password: string,
}

const Home = () => {

    const handleTest = async () => {
        // let params: loginParams = {
        //     username: '测试账号1',
        //     password: '1qaz!QAZ'
        // }
        // const res = await myAxios.post('auth/login', params);
        // console.log(res);

        // myAxios.setToken()


        // Message.success(message :'123', 3000);
    }

    return (
        <div>
            <button onClick={handleTest}>测试</button>

        </div>
    );
};

export default Home;
