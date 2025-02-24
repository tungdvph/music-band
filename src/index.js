// src/index.js
import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js'; // Import routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const hbs = create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Sử dụng routes
app.use('/', routes); // Sử dụng router chính

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});