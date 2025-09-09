import express from "express"
import { PrismaClient } from "@prisma/client"
import { authMiddleWare } from "../middleware/authMiddleWare";
import { createAssetSchema } from "../config/assets.config";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/api/createAsset", authMiddleWare, async(req, res) => {
    try {
        const {
            title, description, type, game, rarity, style, modType, tags, 
            price, discountPrice, thumbnail, previewUrl, fileUrl, fileSize, 
            status, isFeatured, version
        } = createAssetSchema.parse(req.body);
        const createAsset = await prisma.asset.create({
            data: {
                title, description, type, game, rarity, style, modType, tags,
                metadata: {}, price, discountPrice, thumbnail, previewUrl, fileUrl, fileSize,
                status, isFeatured, version, creatorId: req.user.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                game: true,
                rarity: true,
                style: true,
                modType: true,
                tags: true,
                metadata: true,
                price: true,
                discountPrice: true,
                thumbnail: true,
                previewUrl: true,
                fileUrl: true,
                fileSize: true,
                status: true,
                isFeatured: true,
                version: true,
                creatorId: true,
                createdAt: true,
            }
        })
        return res.status(200).json({message: "Asset created successfully!", asset: createAsset})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/api/getAssets", authMiddleWare, async(req, res) => {
    try {
        const getAssets = await prisma.asset.findMany({
            where: {
                creatorId: req.user.id
            }, select: {
                id: true, title: true, description: true, type: true, game: true,
                rarity: true, style: true, modType: true, tags: true, metadata: true,
                price: true, discountPrice: true, thumbnail: true, previewUrl: true,
                fileUrl: true, fileSize: true, status: true, isFeatured: true,
                version: true, creatorId: true, createdAt: true,
            }
        })
        return res.status(200).json({message: "Assets fetched successfully!", assets: getAssets})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/api/getAsset/:id", authMiddleWare, async(req, res) => {
    try {
        const assetId = req.params.id;
        const getAsset = await prisma.asset.findUnique({
            where: {
                id: assetId
            }, select: {
                id: true, title: true, description: true, type: true, game: true,
                rarity: true, style: true, modType: true, tags: true, metadata: true,
                price: true, discountPrice: true, thumbnail: true, previewUrl: true,
                fileUrl: true, fileSize: true, status: true, isFeatured: true,
                version: true, creatorId: true, createdAt: true,
            }
        })
        return res.status(200).json({message: "Asset fetched successfully!", asset: getAsset})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.put("/api/updateAsset/:id", authMiddleWare, async(req, res) => {
    try {
        const assetId = req.params.id;
        const {title, description, type, game, rarity, style, modType, tags, 
            price, discountPrice, thumbnail, previewUrl, fileUrl, fileSize, 
            status, isFeatured, version} = req.body;
        if(!assetId){
            return res.status(400).json({error: "Asset ID is required!"})
        }
        const updateAsset = await prisma.asset.update({
            where: {
                id: assetId
            }, data: {
                title, description, type, game, rarity, style, modType, tags,
                metadata: {}, price, discountPrice, thumbnail, previewUrl, fileUrl, fileSize,
                status, isFeatured, version, creatorId: req.user.id
            },
            select: {
                id: true, title: true, description: true, type: true, game: true,
                rarity: true, style: true, modType: true, tags: true, metadata: true,
                price: true, discountPrice: true, thumbnail: true, previewUrl: true,
                fileUrl: true, fileSize: true, status: true, isFeatured: true,
                version: true, creatorId: true, createdAt: true,
            }
        })
        return res.status(200).json({message: "Asset updated successfully!", asset: updateAsset})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

router.delete("/api/deleteAsset/:id", authMiddleWare, async(req, res) => {
    try {
        const assetId = req.params.id;
        if(!assetId){
            return res.status(400).json({error: "Asset ID is required!"})
        }
        const deleteAsset = await prisma.asset.delete({
            where: {
                id: assetId
            }
        })
        return res.status(200).json({message: "Asset deleted successfully!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})
export default router

    