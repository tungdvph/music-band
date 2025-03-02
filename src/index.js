// src/index.js
import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import db from './config/db/index.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import moment from 'moment'; // Import moment

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await db.connect();

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(methodOverride('_method'));
        app.use(express.static(path.join(__dirname, 'public')));

        // Cấu hình Handlebars (Đăng ký helper dateFormat)
        const hbs = create({
            extname: '.hbs',
            helpers: {
                sum: (a, b) => a + b,
                eq: (a, b) => a === b,
                isObject: value => typeof value === 'object' && value !== null,
                dateFormat: (date, format) => { // Thêm helper dateFormat
                    if (!date) return '';
                    return moment(date).format(format);
                },
            },
        });

        app.engine('.hbs', hbs.engine);
        app.set('view engine', '.hbs');

        // Thiết lập thư mục views
        app.set('views', [
            path.join(__dirname, 'app', 'admin', 'views'),
            path.join(__dirname, 'app', 'site', 'views')
        ]);

        app.use('/', routes);

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.error("Không thể khởi động server", error);
    }
}

startServer();

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: err.message || 'Đã xảy ra lỗi không xác định!',
        layout: 'admin',
    });
});