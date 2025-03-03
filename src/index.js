import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import db from './config/db/index.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import moment from 'moment';
import session from 'express-session'; // Thêm
import flash from 'connect-flash';     // Thêm
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

        console.log("Static files path:", path.join(__dirname, 'public'));

        app.use(express.static(path.join(__dirname, 'public')));

        // Cấu hình express-session (Thêm đoạn này)
        app.use(session({
            secret: 'your-secret-key', // Thay bằng một chuỗi bí mật, KHÔNG ĐƯỢC public chuỗi này.
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 // 1 day (tùy chỉnh)
            }
        }));

        // Cấu hình connect-flash (Thêm đoạn này)
        app.use(flash());

        // Middleware để truyền biến flash messages vào tất cả các views
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');  // Cho passport.js (sẽ dùng sau)
            res.locals.user = req.user || null; // Thêm dòng này, truyền thông tin user vào view.
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


// Middleware xử lý lỗi chung (Giữ nguyên)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: err.message || 'Đã xảy ra lỗi không xác định!',
        layout: 'admin',
    });
});