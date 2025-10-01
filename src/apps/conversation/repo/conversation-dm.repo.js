import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversationFilePath = path.join(__dirname, '../../../data/database/conversation.json');

export const getAllConversations = () =>
{
    if(fs.existsSync(conversationFilePath))
    {
        let data = fs.readFileSync(conversationFilePath);
        data = data == "" ? "[]" : data
        data = JSON.parse(data)
        return data
    }
    else
    {
        return null
    }
}

export const getAllConversationByUser = (id) =>
{
    const conversations = getAllConversations()
    if(!conversations) return null
    const userConvos = conversations.filter(conversation => conversation.participants[1] == id || conversation.participants[0] == id) ?? null
    return userConvos
}

export const createConversation = (userId, receiverId) =>
{
    if(fs.existsSync(conversationFilePath))
    {
        let data = fs.readFileSync(conversationFilePath);
        data = data == "" ? "[]" : data;
        data = JSON.parse(data);
        data.push({id: Date.now(), participants : [userId, receiverId]})
        fs.writeFileSync(conversationFilePath, JSON.stringify(data))
        return true
    }else
    {
        return false
    }
}