// pages/index.js
import React, { Suspense, lazy, useRef } from 'react';
import TypewriterText from './TypewriterText';
import LoadingDots from "./LoadingDot";
import BaguaChart from "../../src/components/BaguaChart";

export default function Home() {
    const loading = true;
    const ref = useRef(null);
    return (
        <div ref={ref}>
            <h1>首页</h1>
            <BaguaChart/>
            {/*<TypewriterText*/}
            {/*    text="你好，这是一段有节奏感的文字显示效果！这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容这是通过流式渲染加载的动态内容"*/}
            {/*    speed={30}*/}
            {/*    onComplete={() => console.log('打字效果完成！')}*/}
            {/*    blinkCursor={true}*/}
            {/*/>*/}

            {/*<LoadingDots text=""/>*/}

        </div>
    );
}
