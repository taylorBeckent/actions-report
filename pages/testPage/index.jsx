import React, { useState, useEffect, useCallback } from 'react';

const Example = () => {
    const [count, setCount] = useState(0);

    // 使用 useCallback 确保回调函数只有在 count 改变时才会重新创建
    const fetchData = useCallback(() => {
        console.log('Fetching data...');
    }, []); // 依赖项为空数组，表示这个函数只会在组件挂载时创建一次

    useEffect(() => {
        fetchData(); // 使用记忆化的回调
    }, [fetchData]); // 只有 fetchData 改变时，才会重新调用 effect

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

export default Example;

// export default () => <div>Welcome to testPage!</div>
