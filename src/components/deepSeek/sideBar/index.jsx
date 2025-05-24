import React, {useState, useEffect} from "react";
import styles from './index.module.css';

const SideBar = () => {
    return (
        <div className={styles["sideBar"]}>
            <div className={styles["sideBar-header"]}>
                <div>DeepSeek</div>
                <i className="iconfont icon-category"></i>
            </div>
            <div className={styles["chat-box"]}>
                <div className={styles["chat-component"]}>
                    <div className={styles["timeline"]}>
                        今天
                    </div>
                    <div className={styles["message"]}>
                        js中promise.all详解+我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~

                    </div>
                    <div className={styles["message"]}>
                        hello
                    </div>
                </div>
                <div className={styles["chat-component"]}>
                    <div className={styles["timeline"]}>
                        昨天
                    </div>

                    <div className={styles["message"]}>
                        js中promise.all详解
                    </div>
                    <div className={styles["message"]}>
                        hello
                    </div>
                </div>

            </div>
            <div className={styles["sideBar-footer"]}>
                <div className={styles["sideBar-avatar"]}></div>
                <div className={styles["sideBar-userName"]}>Bobby Axelrod</div>
            </div>
        </div>
    )
}

export default SideBar;
