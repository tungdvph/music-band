import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import db from './config/db/index.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import moment from 'moment';
import session from 'express-session';
import flash from 'connect-flash';
import fs from 'fs';

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

        // Cấu hình express-session
        app.use(session({
            secret: process.env.SESSION_SECRET, // Lấy từ .env
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 // 1 day (tùy chỉnh)
            }
        }));

        // Cấu hình connect-flash
        app.use(flash());

        // Middleware để truyền biến flash messages và user vào tất cả các views
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.session.user || null; // Lấy từ req.session.user
            next();
        });

        // Cấu hình Handlebars
        const hbs = create({
            extname: '.hbs',
            helpers: {
                sum: (a, b) => a + b,
                eq: (a, b) => a === b,
                isObject: value => typeof value === 'object' && value !== null,
                dateFormat: (date, format) => {
                    if (!date) return '';
                    return moment(date).format(format);
                },
            },
        });

        // Đăng ký partials
        const partialsDir = path.join(__dirname, 'app', 'admin', 'views', 'partials');
        if (fs.existsSync(partialsDir)) {
            const filenames = fs.readdirSync(partialsDir);

            filenames.forEach((filename) => {
                const matches = /^([^.]+).hbs$/.exec(filename);
                if (!matches) {
                    return;
                }
                const name = matches[1];
                const template = fs.readFileSync(path.join(partialsDir, filename), 'utf8');
                hbs.handlebars.registerPartial(name, template);
            });
        }

        app.engine('.hbs', hbs.engine);
        app.set('view engine', '.hbs');
        app.set('views', path.join(__dirname, 'app', 'admin', 'views'));


        // --- Cấu hình cho cả admin và React ---

        // 1. Các routes cho phần ADMIN (đặt lên đầu)
        app.use('/', routes);

        // 2. Serve static files cho phần ADMIN (từ thư mục 'public')
        app.use(express.static(path.join(__dirname, 'public')));

        // 3. Serve static files cho React (từ thư mục 'build')
        app.use(express.static(path.join(__dirname, '..', '..', 'client', 'my-musicband-client', 'build')));

        // 4. "Catch-all" route cho React (trả về index.html, đặt cuối cùng)
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '..', '..', 'client', 'my-musicband-client', 'build', 'index.html'));
        });

        // --- Kết thúc phần cấu hình ---

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