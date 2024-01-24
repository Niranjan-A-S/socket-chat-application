import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { authRouter } from './routes/auth';
import { startWSServer } from './tasks';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const httpServer = createServer(app);

startWSServer(httpServer);

//TODO read the cors origin value from the .env file
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(express.json());

app.use('/auth', authRouter);

app.use(errorHandler);

export { httpServer };

