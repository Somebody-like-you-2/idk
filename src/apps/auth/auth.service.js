import {findUserByEmail} from "./auth.repo.js"
import { createUser } from "./auth.repo.js";
import  jwt  from "jsonwebtoken";
export const authService = { 
    async login(longinData)
    {
        const {email, password} = longinData;
        if (!email || !password) {
        throw new Error('Email and password are required');
    }

        const user = this.getUserByEmail(email)
        let token
        if(!user)
        {
            throw new Error("User not found")
        }

        if(this.verifyPassword(password, user.password))
        {
            token = this.signToken({userId: user.id, email: user.email})
        }else{
            throw new Error("password don't match")
        }
        return token
        
    },  
    
    
    getUserByEmail(email){
        return findUserByEmail(email)
    },

    userExists(email)
    {
        return !!findUserByEmail(email)
    }
    ,

    verifyPassword(given, actual)
    {
        return given == actual ? true : false
    },

    signToken(payload)
    {
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "30d"})
    },

    createUser(username, email, password)
    {
        if(this.userExists(email))
        {
            throw new Error("User Exists")
        }
        createUser(username, email, password)
    },

    verifyToken(token)
    {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}


