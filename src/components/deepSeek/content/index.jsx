"use client";
import React, {useState, useEffect, useCallback, useMemo} from "react";
import styles from './index.module.css';
// import markdownStyles from './markdown.module.css';
import {Input} from "antd";
import ReactMarkdown from 'react-markdown';
import rehypePrism from "rehype-prism-plus";
import remarkGfm from 'remark-gfm';
// import 'prismjs/themes/prism-tomorrow.css'
import {throttle} from "lodash";
import dynamic from 'next/dynamic';

const { TextArea } = Input;

const PrismTheme = dynamic(
    () => import('prismjs/themes/prism-tomorrow.css'),
    { ssr: false } //.禁止服务器加载
);

const Content = () => {
    const [ messageList, setMessageList ] = useState([]);
    const [ userMessage, setUserMessage ] = useState(undefined);

    // console.log(messageList);

    const handleSearch = async () => {
        console.log(userMessage);
        if (userMessage) {
            let messageListCopy = JSON.parse(JSON.stringify(messageList));
            let userMessageCopy = JSON.parse(JSON.stringify(userMessage));
            messageListCopy.push({ 'role': 'user', message: userMessageCopy });
            setMessageList(messageListCopy);
            setUserMessage(undefined);
            await fetchSSEData(userMessageCopy, messageListCopy);
        }
    };

    const throttleSetMessage = useMemo(
        () =>
            throttle((newMessages) => {
                setMessageList(newMessages);
            }, 50),
        []
    )

    const handleChunk = useCallback((chunk) => {
        requestAnimationFrame(() => {
            throttleSetMessage(chunk);
        })
    }, [ throttleSetMessage ])

    const fetchSSEData = async (msg, msgList) => {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1-distill-llama-70b:free",
                "stream": true,
                "messages": [
                    {
                        "role": "user",
                        "content": msg
                    }
                ]
            })
        });
        console.log(res);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        console.log(reader, decoder);

        let str = "";
        let answerIndex = 0;//.消息索引

        while (true) {
            const { done, value } = await reader.read();
            console.log(done, value)
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            console.log(chunk, lines);

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    // console.log(data)
                    if (data !== '[DONE]') {
                        let responseData = '';
                        isValidJSON(data) ? responseData = JSON.parse(data) : responseData = { 'choices': [ { 'delta': { 'content': '' } } ] };

                        if (!responseData?.error) {
                            str += responseData?.choices[0]?.delta?.content;
                            let messageListCopy = JSON.parse(JSON.stringify(msgList));
                            if (messageListCopy[messageListCopy.length - 1]?.answerIndex == answerIndex) {
                                // console.log('当前内容', str);
                                messageListCopy[messageListCopy.length - 1].message = str;
                            } else {
                                messageListCopy.push({ 'role': 'deepSeek', message: str, answerIndex })
                            }

                            setMessageList(messageListCopy);
                            // handleChunk(messageListCopy);
                            console.log(messageList, messageListCopy)
                        } else {
                            try {
                                let failedReason = JSON.parse(responseData.error.metadata.raw);
                                let failInfo = JSON.parse(failedReason.error);
                                // console.log(failInfo.message);
                            } catch (error) {
                                // console.log('Invalid JSON string failedReason', error);
                                // throw error;
                            }
                        }
                    } else {
                        answerIndex++;
                    }
                }
            }
        }
        console.log('str100', str, answerIndex);
    };

    const isValidJSON = (jsonString) => {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (error) {
            return false;
        }
    }

    const handleKeyDown = async (e) => {
        if (e.key == 'Enter' && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            await handleSearch();
        } else if (e.key == 'Enter' && (e.shiftKey || e.ctrlKey)) {
        }
    }

    return (
        <div className={styles["contentNew"]}>

            {messageList && messageList.length > 0 ? (
                <>
                    <div className={styles["conversion"]}>
                        {messageList.map(item => {
                                if (item.role == 'user') {
                                    return (
                                        <div className={styles["user"]}>
                                            <div className={styles["user-context"]}>{item.message}</div>
                                        </div>
                                    )
                                }
                                if (item.role == 'deepSeek') {
                                    return (
                                        <div className={`${styles["assistant"]} ${styles["markdown-wrapper"]}`}>
                                            {/*<div>{item.message}</div>*/}
                                            {/*<ReactMarkdown>{item.message}</ReactMarkdown>*/}
                                            <ReactMarkdown
                                                children={item.message}
                                                // content={item.message}
                                                remarkPlugins={[ remarkGfm ]}
                                                rehypePlugins={[ rehypePrism ]}
                                            />
                                            <div className={styles["assistant-bottom"]}></div>
                                        </div>
                                    )
                                }
                            }
                        )}
                    </div>
                    <div className={styles['input-section']}>
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 6 }}
                            className={styles["input-field"]}
                            placeholder="给 DeepSeek 发送消息"
                            value={userMessage}
                            onChange={e => {
                                setUserMessage(e.target.value)
                            }}
                            onKeyDown={handleKeyDown}
                        />

                        <div className={styles["send-button"]} onClick={handleSearch}> ➤</div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles["header"]}>我是 DeepSeek, 很高兴见到你！</div>
                    <div className={styles["tips"]}>我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~</div>
                    <div className={styles['input-section']}>
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 6 }}
                            className={styles["input-field"]}
                            placeholder="给 DeepSeek 发送消息"
                            value={userMessage}
                            onChange={e => {
                                setUserMessage(e.target.value)
                            }}
                            onKeyDown={handleKeyDown}
                        />

                        <div className={styles["send-button"]} onClick={handleSearch}> ➤</div>
                    </div>
                </>
            )}


        </div>
    )
}

// export async function getServiceSideProps() {
//     const data = 'This data is fetched on the server-side;';
//     return {
//         props: {
//             data,//.
//         }
//     }
// }

export default Content;
