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
import cors from 'cors';
import MongoStore from 'connect-mongo';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
console.log("Port:", process.env.PORT);

async function startServer() {
    try {
        await db.connect();
        console.log('Kết nối MongoDB thành công!');

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(methodOverride('_method'));

        const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];
        app.use(cors({
            origin: function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
            credentials: true, // Allow cookies to be sent
        }));

        // Middleware xác định domain (frontend hoặc backend)
        const getDomain = (req) => {
            const host = req.hostname; // Lấy hostname (chỉ tên miền, không có port)
            if (host === 'localhost') {
                return req.headers.referer?.startsWith('http://localhost:3001') ? 'client' : 'admin';
            }
            return 'admin'; // Hoặc xử lý các tên miền khác nếu cần
        };


        // Cấu hình session
        app.use((req, res, next) => {
            const domain = getDomain(req);
            const sessionConfig = {
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true, // Quan trọng: ngăn JavaScript truy cập cookie
                    // secure: true, // Chỉ dùng khi có HTTPS
                },
                store: MongoStore.create({
                    mongoUrl: process.env.MONGODB_URI,
                    collectionName: 'sessions',
                }),
                name: domain === 'client' ? 'clientSession' : 'adminSession', // Đặt tên cookie dựa trên domain
            };
            session(sessionConfig)(req, res, next); // Gọi session() như một middleware
        });


        app.use(flash());

        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.session.user || null; // Lấy user từ session
            next();
        });

        const hbs = create({
            extname: '.hbs',
            helpers: {
                sum: (a, b) => a + b,
                eq: (a, b) => a === b,
                isObject: value => typeof value === 'object' && value !== null,
                isArray: value => Array.isArray(value),
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
        app.set('views', path.join(__dirname, 'app', 'admin', 'views'));

        const rootDir = path.resolve();
        const reactBuildPath = path.join(rootDir, 'client', 'my-musicband-client', 'build'); // Chú ý đường dẫn
        app.use(express.static(reactBuildPath)); // Đặt static file middleware LÊN TRÊN

        const uploadsPath = path.join(rootDir, 'src', 'public', 'uploads');
        app.use('/uploads', express.static(uploadsPath));

        app.use('/', routes); // routes ở DƯỚI

        app.get(/^(?!\/admin|\/api).*/, (req, res) => {
            res.sendFile(path.join(reactBuildPath, 'index.html'));
        });


        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Lỗi kết nối MongoDB:', error);
    }
}

startServer();