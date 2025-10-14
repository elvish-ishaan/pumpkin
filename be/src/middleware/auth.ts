import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import prisma from "../configs/prismaClient.js";


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
    const decodedData = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JwtPayload & {
      userEmail: string;
      userId: string
    }

    //find user in db
    try {
      const user = await prisma.user.upsert({
        where: {
          id: decodedData?.userId || ""
        },
        update:{},
        create: {
          id: decodedData?.userId as string,
          email: decodedData.userEmail
        }
      })
    } catch (error) {
      console.log(error,'err in creating user in db')
    }

    // now you have Google user info
    req.user = decodedData;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
