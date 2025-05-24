import React, {useState, useEffect} from "react";
import styles from './index.module.css';
// import SideBar from "./components/sideBar";
// import Content from "./components/content";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import('../../src/components/deepSeek/sideBar'), {
    ssr: false
});
const Content = dynamic(() => import('../../src/components/deepSeek/content'), {
    ssr: false
});

const MainPage = () => {
    return (
        <div className={styles.container}>
            <SideBar/>
            <Content/>
        </div>
    )
}

export default MainPage;
