// src/index.js (Đã sửa)
import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import moment from 'moment';
import db from './config/db/index.js';
import routes from './routes/index.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

async function startServer() {
    try {
        await db.connect();

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(methodOverride('_method'));
        app.use(express.static(path.join(__dirname, 'public')));

        const hbs = create({ // Tạo instance TRƯỚC
            extname: '.hbs',
            helpers: {
                sum: (a, b) => a + b,
                eq: (a, b) => a === b,
                isObject: (value) => {
                    return typeof value === 'object' && value !== null;
                }
            }
        });

        // Đăng ký helper dateFormat TRƯỚC
        hbs.handlebars.registerHelper('dateFormat', (date, format) => {
            if (!date) {
                return '';
            }
            return moment(date).format(format);
        });

        app.engine('.hbs', hbs.engine); // Cấu hình engine SAU
        app.set('view engine', '.hbs');
        app.set('views', path.join(__dirname, 'app', 'views'));

        app.use('/', routes);
        app.use('/admin', adminRoutes);

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.error("Không thể khởi động server", error);
    }
}

startServer();