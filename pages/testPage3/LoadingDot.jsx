import React from 'react';

const LoadingDots = ({ text = "加载中" }) => {
    return (
        <div className="loading-container">
            {text}
            <span className="dot-animation">
                <span>K</span>
                <span>K</span>
                <span>K</span>
            </span>
            <style>
                {`
                    .loading-container {
                        display: inline-flex;
                        align-items: center;
                    }
                    
                    .dot-animation span {
                        animation: dotAnimation 1.4s infinite;
                        opacity: 0;
                        margin-left: 2px;
                    }
                    
                    .dot-animation span:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    
                    .dot-animation span:nth-child(3) {
                        animation-delay: 0.4s;
                    }
                    
                    @keyframes dotAnimation {
                        0% { opacity: 0; }
                        20% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
};

export default LoadingDots;
