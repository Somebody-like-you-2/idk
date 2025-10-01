import {findUserByEmail} from "./auth.repo.js"
import {authService} from "./auth.service.js"
export const postSignup = (req, res) =>
{
    const {username, email, password} = req.body
    if(!username || !email || !password)
    {
        return res.status(400).send({messsage: "Provide all the fields"})
    }
    try
    {
        authService.createUser(username, email, password)
    }
    catch(e)
    {
        res.status(200).send({message: "user Exists"})
        return
    }
    res.status(201).send({"message" : "user created"})
}

export const postLogin = async (req, res) =>
{
    const {email, password} = req.body
    if(!password || !email)
    {
        return res.status(401).send()
    }

    const token = await authService.login({email, password})
    return res.cookie('token', token, {httpOnly: true, maxAge: 15*60*1000}).send()
}


