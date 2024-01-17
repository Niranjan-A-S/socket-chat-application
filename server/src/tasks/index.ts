import { Server } from 'http';
import { Server as WSServer } from 'socket.io';
import { PORT } from '../constants/server';

export const startWSServer = (_httpServer: Server) => {
    try {
        const corsOrigin = process.env.CORS_ORIGIN || '*';
        const io = new WSServer(_httpServer, {
            cors: {
                origin: corsOrigin
            },
            serveClient: false
        });
    } catch (error) {
        console.log('WS Server Connection Error: ', error);
    }
};

export const startHTTPServer = (_httpServer: Server) => {
    const port = process.env.PORT || PORT;
    _httpServer.listen(port, () => {
        console.log(`⚙️  HTTP Server Listening on port ${port}.`);
    });
};
