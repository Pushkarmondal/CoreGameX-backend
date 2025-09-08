import express from 'express'
import {PrismaClient, Role} from '@prisma/client'
import { loginSchema, signupSchema } from '../config/auth.config';
import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { config } from '../config';

const router = express.Router();
const prisma = new PrismaClient();

router.post("/api/auth/signup", async(req, res) => {
    try {
        const {email, name, password} = signupSchema.parse(req.body);
        if(!email || !name || !password){
            return res.status(400).json({error: "Invalid details!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const signupUser = await prisma.user.create({
            data: {
                email,
                username: name,
                password: hashedPassword,
                roles: [Role.GAMER],
                activeRole: Role.GAMER,
                isEmailVerified: false,
                isActive: true,
                lastLogin: null,
                createdAt: new Date()
            },
            select: {
                id: true,
                email: true,
                username: true,
                roles: true,
                activeRole: true,
                isEmailVerified: true,
                isActive: true,
                lastLogin: true,
                createdAt: true
            }
        })
        return res.status(201).json({message: "User created successfully!", signupUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})

router.post("/api/auth/login", async(req, res) => {
    try {
        const {email, password} = loginSchema.parse(req.body)
        if(!email || !password) {
            return res.status(400).json({error: "Invalid details!"})
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                username: true,
                password: true,
                roles: true,
                activeRole: true,
                isEmailVerified: true,
                isActive: true,
                lastLogin: true,
                createdAt: true
            }
        })
        if(!user) {
            return res.status(404).json({error: "User not found!"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(401).json({error: "Invalid password!"})
        }
        const {password: _, ...safeUser} = user
        const token = jwt.sign({id: user.id}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRES_IN || '7d'} as SignOptions)
        return res.status(200).json({message: "Login successful!", user: safeUser, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

export default router