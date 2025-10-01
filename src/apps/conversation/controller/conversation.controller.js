export const findConversation = (req, res) =>
{
    const {participants} = req.body
    if(!participants) res.status(400).send()
}