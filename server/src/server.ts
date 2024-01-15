import express from 'express';
import { createServer } from 'http';
import { startWSServer } from './tasks';

const app = express();
const httpServer = createServer(app);

startWSServer(httpServer);

export { httpServer };

