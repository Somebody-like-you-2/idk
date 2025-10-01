import fs from "fs"

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, '../../data/database/users.json');
export const createUser = (username, email, password) =>
{
    if(fs.existsSync(usersFilePath))
    {
        let data = fs.readFileSync(usersFilePath)
        data = data == "" ? "[]" : data
        data = JSON.parse(data)
        data.push({id: data.length+1,username, email, password})
        fs.writeFileSync(usersFilePath, JSON.stringify(data))
 

    }
    else
    {
           console.log('Cant create user')
    }

}

export const findUserByEmail = (email) =>
{
    if(fs.existsSync(usersFilePath))
    {
        let data = fs.readFileSync(usersFilePath)
        data = data == "" ? "[]" : data
        data = JSON.parse(data)
        return data.find(user => user.email == email)

    }
    else
    {
        console.log('Cant retrive all users')
    }
}
