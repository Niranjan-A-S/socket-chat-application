import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { authRouter } from './routes/auth';
import { startWSServer } from './tasks';

const app = express();

//TODO read the cors origin value from the .env file
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(express.json());

const httpServer = createServer(app);
startWSServer(httpServer);

app.use('/auth', authRouter);

export { httpServer };

