import { WebSocketServer } from 'ws';
import {addClient, getUserConnections, clients} from "./services/socketService.js"
import { authenticateSocket } from './middleware/socketAuth.js';
import { messageHandler } from '../apps/messaging/handlers/messageHandler.js';


export const setupWebSocketServer = async (server) =>
{
    const wss = new WebSocketServer({server, path: '/message'})


    wss.on('connection', async (ws, request) => 
    {
        const user = await authenticateSocket(request)
        if(!user)
        {
            ws.close(1008, 'Authentication Failed');
            return
        }
        ws.user = user

        messageHandler(ws)
        let connectionData;
        try{
            connectionData = addClient(ws, user)
        }
        catch(e)
        {
            if(e.message == "no userId") ws.close("invalid Token")
        }


        ws.on('close', (ws) => {
            const userConnections = getUserConnections(user.userId)
            userConnections.delete(connectionData);
            console.log(`User ${user.userId} disconnected. Remaining connections: ${userConnections.size}`);

            if (userConnections.size === 0) {
            clients.delete(user.userId);
        }
    });
    })
}