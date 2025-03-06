// src/app/middleware/sessionMiddleware.js
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const configureSession = () => {
    const sessionConfig = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        },
        name: 'adminSession' // Default session name (for admin)
    };

    // Adjust session name for client-side
    if (process.env.PORT === '3001') {
        sessionConfig.name = 'clientSession';
    }

    return session(sessionConfig);
};

export default configureSession;