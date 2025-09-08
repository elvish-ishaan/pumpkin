import "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
    userEmail: string;
  }
}