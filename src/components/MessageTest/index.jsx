import React, { useState, useEffect } from 'react';
import './index.module.css';

const MessageTest = ({ message, type = 'info', duration = 3000, onClose }) => {
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
        <div className={`message-test-container ${type}`}>
            <div className="message-test-content">
                {message}
            </div>
        </div>
    );
};

// 创建一个全局消息实例
let messageTestInstance = null;

// 创建一个容器来挂载消息组件
const createMessageTestContainer = () => {
    const container = document.createElement('div');
    container.className = 'message-test-global-container';
    document.body.appendChild(container);
    return container;
};

// 显示消息的方法
MessageTest.show = (message, type = 'info', duration = 3000) => {
    // 如果已经有消息实例，先移除它
    if (messageTestInstance) {
        document.body.removeChild(messageTestInstance);
    }

    // 创建新的容器
    messageTestInstance = createMessageTestContainer();

    // 渲染消息组件
    const ReactDOM = require('react-dom/client');
    const root = ReactDOM.createRoot(messageTestInstance);
    root.render(
        <MessageTest
            message={message}
            type={type}
            duration={duration}
            onClose={() => {
                root.unmount();
                document.body.removeChild(messageTestInstance);
                messageTestInstance = null;
            }}
        />,
    );
};

// 快捷方法
MessageTest.success = (message, duration) => MessageTest.show(message, 'success', duration);
MessageTest.error = (message, duration) => MessageTest.show(message, 'error', duration);
MessageTest.warning = (message, duration) => MessageTest.show(message, 'warning', duration);
MessageTest.info = (message, duration) => MessageTest.show(message, 'info', duration);

export default MessageTest;

