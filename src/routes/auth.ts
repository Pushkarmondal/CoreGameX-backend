import express from 'express'
import { Router } from 'express'
import {PrismaClient} from '@prisma/client'

const router = express.Router();
const prisma = new PrismaClient();

router.post("/api/auth/signup", async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})


