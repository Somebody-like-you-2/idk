import jwt from 'jsonwebtoken';

export const authenticateSocket = async (request) => {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        console.log("no auth ")
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload
    }
    catch(
        error
    )
    {
        console.log("failed in verifying the token")
        return
    }
}