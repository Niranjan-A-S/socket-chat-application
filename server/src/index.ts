import dotenv from 'dotenv';
import { connectToDB } from './db';
import { startHTTPServer } from './tasks';
import { httpServer } from './server';

dotenv.config();

(async () => {
    await connectToDB();
    startHTTPServer(httpServer);
})();
