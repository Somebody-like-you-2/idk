import { getConversationById } from "../service/conversation-dm.service.js"

export const findDm = (req, res) =>
{
    const {receiverId} = req.body
    const userId = req.user.userId
    if(!receiverId || isNaN(receiverId)) return res.status(400).send()
    const conversation = getConversationById(userId, receiverId);
    console.log(conversation)
    res.status(200).send(conversation)
}