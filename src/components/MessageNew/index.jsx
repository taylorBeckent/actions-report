// Toast.jsx
import React, { useState, useEffect } from 'react';

// 全局管理消息状态
let showToast = null;

const ToastContainer = () => {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const timeoutRef = React.useRef();

    console.log(showToast);

    // 暴露全局调用方法
    useEffect(() => {
        showToast = (msg) => {
            setMessage(msg);
            setVisible(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setVisible(false), 3000);
        };
        return () => {
            showToast = null;
        };
    }, []);

    console.log(showToast);

    // 样式配置
    const toastStyle = {
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

    return <div style={toastStyle}>{message}</div>;
};

// 全局调用方法
export const toast = (message) => {
    console.log(showToast);
    if (showToast) showToast(message);
};

export default ToastContainer;
