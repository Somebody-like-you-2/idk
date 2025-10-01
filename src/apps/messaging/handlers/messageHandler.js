import { clients, conversationRooms } from "../../../websocket/services/socketService.js"

export const messageHandler = (ws) =>
{
    ws.on('message', data =>
    {
        const payload = JSON.parse(data.toString())
        if(!payload.type || !payload.content)
        {
            return ws.close(4001, "invalid request")
        }

        const {content, type} = payload
        switch(type)
        {
            case "conversation:message" : 
                sendMessage(content, ws)
                break
            case "conversation:join":
                joinConversationRoom({userId: ws.user.userId, ...content}, ws)
            
        }
    }   
    )
}




function sendMessage(content, ws)
{
    const {message, receiverId} = content
    if(!message || !receiverId)
    {
        ws.close(4001, {message : "Invalid Request"})
    }

    clients.get(receiverId).forEach(conn =>
    {
        if(conn.ws.readyState == conn.ws.OPEN)
        {
            conn.ws.send(message)
        }
    }
    )
}

function joinConversationRoom(content, ws)
{
    const{conversationId, userId} = content;
    if(!conversationId || !userId) 
    {
        return ws.close(4001, "Missing conversationId or userId")
    }
    if(!conversationRooms.has(conversationId))
    {
        conversationRooms.set(conversationId, new Set())
    }
    conversationRooms.get(conversationId).add(ws)

    ws.currentConversation = conversationId

    console.log(`User ${userId} joined conversation ${conversationId} total users in conversations: ${conversationRooms.get(conversationId).size}`)
}