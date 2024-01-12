import dotenv from 'dotenv';
import { PORT } from './constants/server';
import { connectToDB } from './db';
import { httpServer } from './server';

dotenv.config();

const startServer = () => {
    const port = process.env.PORT || PORT;
    httpServer.listen(port, () => {
        console.log(`HTTP Server Listening on port ${port}.`);
    });
};

(async () => {
    await connectToDB();
    startServer();
})();
