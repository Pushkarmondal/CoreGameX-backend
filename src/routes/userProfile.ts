import express from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { authMiddleWare } from '../middleware/authMiddleWare';
import { updateUserProfile } from '../config/user.profileUpdate';

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

router.put("/api/updateUserProfile", authMiddleWare, async(req, res) => {
    try {
        const {email, username, bio, profilePic} = updateUserProfile.parse(req.body);
        if(!email || !username || !bio || !profilePic) {
            return res.status(400).json({error: "Invalid details!"})
        }
        const profileUpdate = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                email,
                username,
                bio,
                profilePic
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
        const {password: _, ...safeUser} = profileUpdate
        return res.status(200).json({message: "User profile updated successfully!", profileUpdate: safeUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

router.post("/api/swithUserRole", authMiddleWare, async(req, res) => {
    try {
        const {role} = req.body;
        if(!role) {
            return res.status(400).json({error: "Invalid role!"})
        }
        
        const user = await prisma.user.update({
                where: {
                    id: req.user.id
                },
                data: {
                    roles: [role],
                    activeRole: role
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
        const {password: _, ...safeUser} = user
        return res.status(200).json({message: "User role switched successfully!", user: safeUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

router.post("/api/enableUserRoles", authMiddleWare, async (req, res) => {
    try {
      const { role } = req.body;
  
      const user = await prisma.user.findUnique({
        where: { id: req.user.id }
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
  
      if (user.roles.includes(role)) {
        return res.status(400).json({ error: `User already has ${role} role!` });
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          roles: { push: role },
          activeRole: role
        },
        select: {
          id: true,
          email: true,
          username: true,
          bio: true,
          profilePic: true,
          roles: true,
          activeRole: true,
          isEmailVerified: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
        }
      });
  
      return res.status(200).json({
        message: `User role '${role}' enabled successfully!`,
        user: updatedUser
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

export default router;