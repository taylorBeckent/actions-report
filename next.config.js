// next.config.js
// /// next.config.js
module.exports = {
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true
    },
    webpack(config, { isServer }) {
        if (isServer) {
            // 对于 SSR 阶段，排除一些模块
            config.externals = [
                ...(config.externals || []),
                (context, request, callback) => {
                    if (/rc-util\/es\/warning/.test(request)) {
                           return callback(null, 'commonjs ' + request);
                    }
                    callback();
                },
            ];
        }
        return config;
    },
    transpilePackages: ['antd', '@ant-design', 'rc-util', 'other-packages'],//.添加依赖，确保被babel转移
    // experimental: { //.处理ES模块外部依赖
    //     esmExternals: 'loose', // 或 false
    // },
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:8080',
    //         pathRewrite: {'^/api/': '/'},
    //         changeOrigin: true,
    //         // secure: false,
    //     }
    // }
};
