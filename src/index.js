// src/index.js
import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import moment from 'moment';
import db from './config/db/index.js';
import routes from './routes/index.js';

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

        const hbs = create({
            extname: '.hbs',
            helpers: {
                sum: (a, b) => a + b,
                eq: (a, b) => a === b,
                dateFormat: (date, format) => {
                    if (!date) {
                        return '';
                    }
                    return moment(date).format(format);
                },
                // Thêm helper isObject vào đây
                isObject: (value) => {
                    return typeof value === 'object' && value !== null;
                }
            }
        });

        app.engine('.hbs', hbs.engine);
        app.set('view engine', '.hbs');
        app.set('views', path.join(__dirname, 'app', 'views'));

        app.use('/', routes);
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.error("Không thể khởi động server", error);
    }
}

startServer();