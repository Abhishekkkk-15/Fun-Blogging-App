import jwt from 'jsonwebtoken'
import { config } from "dotenv";

config();

const checkAuthenticaion  = (req, res, next) => {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).json({ message: "Authentication token not provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
  
      req.user = decoded; // Attach decoded payload to the request object
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
