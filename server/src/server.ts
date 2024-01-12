import express from 'express';
import { createServer } from 'http';

const app = express();
export const httpServer = createServer(app);
