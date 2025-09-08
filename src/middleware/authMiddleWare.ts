import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(401).json({error: "Unauthorized!"})
        }
        const decodedToken = jwt.verify(token, config.JWT_SECRET) as {id: string};
        req.user = { id: Number(decodedToken.id) };
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: "Unauthorized!"})
    }
}