import React, { useState, useEffect } from 'react';

const TypewriterText = ({
                            text,
                            speed = 100,
                            onComplete = () => {}, // 完成回调
                            blinkCursor = true // 是否显示闪烁的光标
                        }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <div style={{ display: 'inline-block' }}>
            {displayText}
            {blinkCursor && (
                <span
                    style={{
                        borderRight: '2px solid #000',
                        animation: 'blink 1s step-end infinite'
                    }}
                >
                </span>
            )}
            <style>
                {`
                    @keyframes blink {
                        from, to { border-color: transparent }
                        50% { border-color: #000 }
                    }
                `}
            </style>
        </div>
    );
};

export default TypewriterText;
