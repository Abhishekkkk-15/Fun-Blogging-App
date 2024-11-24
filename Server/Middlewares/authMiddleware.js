import jwt from 'jsonwebtoken'
import path from 'path'
import { config } from "dotenv";

config();

const checkAuthenticaion = (req,res,next) => {
    const token = req.cookies.accessToken;
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET,(err,decode)=>{
        if(err) return res.sendStatus(403);
        req.user = decode;
        next();
    });
};

const checkAdmin = (req,res,next) =>{
    const token = req.cookies.accessToken;
    if(!token) res.status(403).json({error:"Access Denied"})
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if(decode.isAdmin){
        next();
    }else{
        res.status(403).json({error:"Admin access required"})
    }
}

export {
    checkAuthenticaion,
    checkAdmin
}
