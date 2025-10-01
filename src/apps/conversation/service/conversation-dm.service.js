import { getAllConversationByUser, createConversation } from "../repo/conversation-dm.repo.js"

export const getConversationById = (userId, recieverId) =>
{
    const conversations = getAllConversationByUser(userId)
    if(!conversations) return null
    let userConvo = conversations.find(conv => conv.participants[0] == recieverId || conv.participants[1] == recieverId)
    if(!userConvo)
    {
        userConvo = createConversation(userId, recieverId)
    }
    return userConvo
}