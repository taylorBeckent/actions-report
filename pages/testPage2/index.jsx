import React from 'react';
// import Message from '../../src/components/Message';
// import Message from '../../src/components/MessageTest';
import ToastContainer from '../../src/components/MessageNew';
import {toast} from "../../src/components/MessageNew";
import MessageTemplate from "../../src/components/MessageTemplate";

const testPage2 = () => {
    const handleTest = () => {
        // Message.success('123', 1000)
        toast('操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功')
    }

    const handleTest2 = () => {
        // Message.success('123', 1000)
        toast('测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2')
    }

    const handleTest3 = () => {
        console.log(MessageTemplate);
        // MessageTemplate.show('123', 'info',3000)
        MessageTemplate.success('测试测试', 3000, ()=>{console.log(123)})
    }

    return (
        <div>
            <button onClick={handleTest}>测试</button>
            <button onClick={handleTest2}>测试2</button>
            {/*<Message*/}
            {/*    message="123"*/}
            {/*    type="info"*/}
            {/*    duration={3000}*/}

            {/*/>*/}
            <ToastContainer/>
            {/*<MessageTemplate msg={123}/>*/}
            <button onClick={handleTest3}>测试3</button>
        </div>
    );
};

export default testPage2;
