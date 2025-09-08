import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleWare } from '../middleware/authMiddleWare';

const router = express.Router();
const prisma = new PrismaClient();

router.get("/api/userProfile", authMiddleWare, async(req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                email: true,
                username: true,
                password: true,
                bio: true,
                profilePic: true,
                roles: true,
                activeRole: true,
                isEmailVerified: true,
                isActive: true,
                lastLogin: true,
                createdAt: true,
            }
        })
        if(!user) {
            return res.status(404).json({error: "User not found!"})
        }
        const {password: _, ...safeUser} = user
        return res.status(200).json({message: "User profile fetched successfully!", user: safeUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

export default router;