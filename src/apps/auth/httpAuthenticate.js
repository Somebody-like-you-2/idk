import { authService } from "./auth.service.js";

export const httpAuthenticate = (req,res,next) =>
{
    let token = req.headers.authorization
    token = token.split(' ')[1];
    try{
        const user = authService.verifyToken(token)
        if(!user.userId) return res.status(500).send()
        req.user = user
        next()
    }catch(e)
    {
        res.status(401).send()
    }
}