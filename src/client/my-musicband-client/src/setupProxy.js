// client/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', // Chỉ proxy các request bắt đầu bằng /api
        createProxyMiddleware({
            target: 'http://localhost:3000', // Chuyển đến backend (Express)
            changeOrigin: true,
        })
    );
    app.use( //Nếu bạn có upload file
        '/uploads',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
};