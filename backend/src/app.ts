import express from 'express';
import sessionMiddleware from './config/session';

const app = express();

app.use(sessionMiddleware);

export default app;