import React, { useState, useEffect } from 'react';
import './index.module.css';

const Message = (props) => {
    const {
        message,
        type = 'info',
        duration = 3000,
        onClose
    } = props;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className={`message-container ${type}`}>
            <div className="message-content">
                {message}
            </div>
        </div>
    );
};

// 创建一个全局消息实例
let messageInstance = null;

// 创建一个容器来挂载消息组件
const createMessageContainer = () => {
    const container = document.createElement('div');
    container.className = 'message-global-container';
    document.body.appendChild(container);
    return container;
};

// 显示消息的方法
Message.show = (message, type = 'info', duration = 3000) => {
    // 如果已经有消息实例，先移除它
    if (messageInstance) {
        document.body.removeChild(messageInstance);
    }

    // 创建新的容器
    messageInstance = createMessageContainer();

    // 渲染消息组件
    const ReactDOM = require('react-dom');
    ReactDOM.render(
        <Message
            message={message}
            type={type}
            duration={duration}
            onClose={() => {
                ReactDOM.unmountComponentAtNode(messageInstance);
                document.body.removeChild(messageInstance);
                messageInstance = null;
            }}
        />,
        messageInstance
    );
};

// 快捷方法
Message.success = (message, duration) => Message.show(message, 'success', duration);
Message.error = (message, duration) => Message.show(message, 'error', duration);
Message.warning = (message, duration) => Message.show(message, 'warning', duration);
Message.info = (message, duration) => Message.show(message, 'info', duration);


export default Message;
