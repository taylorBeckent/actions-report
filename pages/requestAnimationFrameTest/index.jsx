import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import {throttle} from 'lodash';

const MessageItem = React.memo(({ message }) => {
    return <div>{message}</div>;
});

const VirtualList = ({ messages }) => (
    <FixedSizeList
        height={300}
        itemCount={messages.length}
        itemSize={50}
    >
        {({ index }) => (
            <MessageItem message={messages[index]} />
        )}
    </FixedSizeList>
);

const ChatMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // 创建节流的setMessages
    const throttledSetMessages = useMemo(
        () =>
            throttle((newMessages) => {
                setMessages(prev => [...prev, ...newMessages]);
            }, 200),
        []
    );

    const handleChunk = useCallback((chunk) => {
        // 缓冲处理
        requestAnimationFrame(() => {
            throttledSetMessages(chunk);
        });
    }, [throttledSetMessages]);

    // 模拟流式数据接收
    useEffect(() => {
        let interval;
        let i = 0;
        if (!loading) {
            interval = setInterval(() => {
                // Simulate chunks of data arriving
                const chunk = Array.from({ length: 100 }, () => `Message ${i++}`);
                handleChunk(chunk);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [loading, handleChunk]);

    return (
        <div>
            <h1>Messages</h1>
            <VirtualList messages={messages} />
            {loading && <p> Loading... </p>}
        </div>
    );
};

export default ChatMessages;
