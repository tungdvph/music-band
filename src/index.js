// src/index.js
import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import db from './config/db/index.js';
import methodOverride from 'method-override';
import moment from 'moment'; // Import moment TẠI ĐÂY

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        eq: (a, b) => a === b,
        dateFormat: (date, format) => { // Helper dateFormat sử dụng moment
            if (!date) {
                return '';
            }
            return moment(date).format(format);
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