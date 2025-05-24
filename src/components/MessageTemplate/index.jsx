import React, {useEffect, useState, useRef, } from 'react';
import styles from './index.module.css';
import TypewriterText from "../../../pages/testPage3/TypewriterText";
// import {CloseCircleOutlined} from 'antd';

let instance = null;

const MessageContainer = (props) => {
    const {
        msg,
        type = 'info',
        duration = 3000,
        onClose
    } = props;

    const [ visible, setVisible ] = useState(true);
    const messageRef = useRef(null);
    const [content, setContent] = useState();

    useEffect(() => {
        console.log(messageRef);

        let timer;

        timer = setTimeout(() => {
            setVisible(false);
            // if(onClose) onClose();
        }, duration);

        messageRef.current.onmouseenter = () => {
            clearTimeout(timer);
            setVisible(true);
        };
        messageRef.current.onmouseleave = () => {
            timer = setTimeout(() => {
                setVisible(false);
                // if(onClose) onClose();
            }, duration);
        }

        return () => {
            clearTimeout(timer);
        }
    }, []);

    // 样式配置
    const containerStyle = {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        zIndex: 1000,
        pointerEvents: 'none',
    };

    return (
        <div ref={messageRef} className={`${styles.containerStyle} ${!visible ? styles.containerClose : ''}`}>
            <div>
                {msg}
            </div>
            <div className={styles['AIContent']}>
                <div>是否进行AI分析？</div>
                <div className={styles.confirm}>Yes</div>
                <div className={styles.cancel}>No</div>
            </div>

            <TypewriterText
                text="你好，这是一段有节奏感的文字显示效果！这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容"
                speed={30}
                onComplete={() => console.log('打字效果完成！')}
                blinkCursor={true}
            />

        </div>

    );
};

// 创建一个容器来挂载消息组件
const createMessageTestContainer = () => {
    const container = document.createElement('div');
    container.className = 'global-container';
    container.style.opacity = '1';
    document.body.appendChild(container);
    return container;
};

const Message = {};

Message.show = (msg, type = 'info', duration, onClose) => {
    // 如果已经有消息实例，先移除它
    if (instance) {
        document.body.removeChild(instance);
    }
    const ReactDOM = require('react-dom/client');
    instance = createMessageTestContainer();
    const root = ReactDOM.createRoot(instance);
    root.render(
        <MessageContainer
            msg={msg}
            type={type}
            duration={duration}
            // onClose={()=>{
            //     root.unmount();
            //     document.body.removeChild(instance);
            //     instance = null;
            // }}
            onClose={() => {
                if (onClose) {
                    console.log(21)
                    root.unmount();
                    document.body.removeChild(instance);
                    instance = null;
                    onClose();
                }
            }}
        />
    );
};

Message.success = (msg, duration, onClose) => {
    Message.show(msg, 'success', duration, onClose)
};

// export default MessageContainer;
export default Message;
