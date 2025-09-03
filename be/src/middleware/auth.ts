import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export async function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    //extract the token
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(500).json({
            success: false,
            message: 'Token not found'
        })
        return
    }
    const decodedData = jwt.verify(token, process.env.NEXTAUTH_SECRET!)
    console.log(decodedData,'getting decoded data be...........')

    // now you have Google user info
    req.user = decodedData;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
