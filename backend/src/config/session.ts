import session from 'express-session';
import connectPSession from "connect-pg-simple";
import dotenv from "dotenv";
import pool from "./db";

dotenv.config();

const PgSession = connectPSession(session);

export default session({
    store: new PgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
    // cookie: {
    //     secure: process.env.NODE_ENV === 'production',
    //     httpOnly: true,
    //     maxAge: 1000 * 60 * 60
    // }
});