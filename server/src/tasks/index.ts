import { Server } from 'http';
import { Server as WSServer } from 'socket.io';
import { PORT } from '../constants/server';
import { Messages } from '../constants/messages';

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
        console.log(Messages.WSS_CONNECTION_ERROR, error);
    }
};

export const startHTTPServer = (_httpServer: Server) => {
    const port = process.env.PORT || PORT;
    _httpServer.listen(port, () => {
        console.log(`${Messages.HTTP_SERVER_CONNECTION_SUCCESSFUL}${port}.`);
    });
};
