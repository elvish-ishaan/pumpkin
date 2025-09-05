
import NextAuth from 'next-auth'

enum PlanType {
    FREE = "free",
    STANDARD = "standard",
    PREMIUM = "premium"
}

declare module 'next-auth' {
    interface Session {
        user:{
            image: string;
            name: string;
            email: string;
            token: string;
            id: string;
            planType: PlanType;
            imagesUploaded: number;
            noOfPrompts: number
        }
    }
}