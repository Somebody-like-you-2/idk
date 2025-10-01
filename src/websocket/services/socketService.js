const clients = new Map();
const conversationRooms = new Map();
export const addClient =(ws, user) =>
{
    if(!user.userId) throw new Error("no userId")
    
    if(!clients.has(user.userId))
    {
        clients.set(user.userId, new Set())
    }

    const userConnections = clients.get(user.userId)
    const connectionData = {
        ws, user, joinedAt: new Date(),
        connectionId: `${user.userId}-${Date.now()}`
    }
    userConnections.add(connectionData)

    console.log(`User ${user.userId} now has ${userConnections.size} connections`)

    return connectionData  
}

export const getUserConnections = (userId) => {
    return clients.get(userId)
}

export {clients, conversationRooms}
