import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import session from "./config/session";

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session);

// Routes
app.use('api/auth', authRoutes);
app.use('api/user', userRoutes);
app.use('api/task', taskRoutes);
app.use('api/category', categoryRoutes);

app.get('/', (_req, res) => {
    res.send('Server is Running...');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is Running on http://locahost:${PORT}');
})

export default app;