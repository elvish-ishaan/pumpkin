import type { NextFunction, Request, Response } from "express";
import prisma from "../configs/prismaClient.js";

export const checkUsage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
        if (!userId) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized'
          });
        }
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
      //check usage for each plan
      switch (user.planType) {
        case 'FREE':
          // Check usage for free plan
          if (user.imagesUploaded >= Number(process.env.FREE_ALLOWED_IMAGE_UPLOADS) ||
              user.noOfPrompts >= Number(process.env.FREE_ALLOWED_IMAGE_PROMPTS)) {
            return res.status(429).json({
              success: false,
              message: 'Free plan usage limit reached'
            });
          }
          break;
        case 'STANDARD':
          // Check usage for pro plan
          if (user.imagesUploaded >= Number(process.env.STANDARD_ALLOWED_IMAGE_UPLOADS) ||
              user.noOfPrompts >= Number(process.env.STANDARD_ALLOWED_IMAGE_PROMPTS)) {
            return res.status(429).json({
              success: false,
              message: 'Pro plan usage limit reached'
            });
          }
          break;
        case 'PREMIUM':
          // Check usage for premium plan
          if (user.imagesUploaded >= Number(process.env.PREMIUM_ALLOWED_IMAGE_UPLOADS) ||
              user.noOfPrompts >= Number(process.env.PREMIUM_ALLOWED_IMAGE_PROMPTS)) {
            return res.status(429).json({
              success: false,
              message: 'Premium plan usage limit reached'
            });
          }
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid plan'
          });
      }
      //allow to move forward if usage is within limits
      next();

    } catch (error) {
      console.error('Error checking usage:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };    