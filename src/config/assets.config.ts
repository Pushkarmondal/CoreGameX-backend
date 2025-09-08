import { z } from "zod";

export const createAssetSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    type: z.enum(["MODEL_3D", "TEXTURE", "AUDIO", "ANIMATION", "PLUGIN", "OTHER"]),
    game: z.string().optional(),
    rarity: z.enum(["COMMON", "RARE", "EPIC", "LEGENDARY", "MYTHICAL"]).optional(),
    style: z.enum(["REALISTIC", "STYLIZED", "PIXEL", "LOW_POLY", "CARTOON", "ANIME", "OTHER"]).optional(),
    modType: z.enum(["CHARACTER", "WEAPON", "VEHICLE", "BUILDING", "TERRAIN", "UI", "EFFECT", "OTHER"]).optional(),
    tags: z.array(z.string()).optional(),
    metadata: z.object({                           // This metadata is optional.
        // 3D Model specific
        polyCount: z.number().optional(),
        vertexCount: z.number().optional(),
        triangleCount: z.number().optional(),
        rigged: z.boolean().optional(),
        animated: z.boolean().optional(),
        hasLOD: z.boolean().optional(), // Level of Detail
        lodLevels: z.number().optional(),
        materialCount: z.number().optional(),
        boneCount: z.number().optional(),
        
        // Texture specific
        textureSize: z.number().optional(),
        textureFormat: z.string().optional(), // PNG, JPG, DDS, etc.
        textureType: z.string().optional(), // Diffuse, Normal, Specular, etc.
        resolution: z.string().optional(), // 1024x1024, 2048x2048, etc.
        hasAlpha: z.boolean().optional(),
        isTileable: z.boolean().optional(),
        
        // Audio specific
        duration: z.number().optional(), // in seconds
        sampleRate: z.number().optional(), // 44100, 48000, etc.
        bitRate: z.number().optional(),
        channels: z.number().optional(), // 1 for mono, 2 for stereo
        audioFormat: z.string().optional(), // MP3, WAV, OGG, etc.
        isLooped: z.boolean().optional(),
        
        // Animation specific
        animationDuration: z.number().optional(),
        frameRate: z.number().optional(),
        frameCount: z.number().optional(),
        animationType: z.string().optional(), // skeletal, morph, transform, etc.
        hasRootMotion: z.boolean().optional(),
        
        // Plugin specific
        pluginVersion: z.string().optional(),
        compatibleEngines: z.array(z.string()).optional(), // Unity, Unreal, Godot, etc.
        engineVersions: z.array(z.string()).optional(),
        dependencies: z.array(z.string()).optional(),
        apiLevel: z.string().optional(),
        
        // General file properties
        compressionType: z.string().optional(),
        isCompressed: z.boolean().optional(),
        originalFileSize: z.number().optional(),
        
        // Game specific
        gameEngine: z.string().optional(),
        targetPlatform: z.array(z.string()).optional(), // PC, Mobile, Console, etc.
        performanceRating: z.enum(["LOW", "MEDIUM", "HIGH", "ULTRA"]).optional(),
        
        // Quality and technical specs
        qualityLevel: z.enum(["DRAFT", "PRODUCTION", "CINEMATIC"]).optional(),
        uvMapped: z.boolean().optional(),
        hasCollisionMesh: z.boolean().optional(),
        physicsMaterial: z.string().optional(),
        shaderType: z.string().optional(),
        
        // Additional properties for complex assets
        subAssets: z.array(z.string()).optional(), // IDs of related sub-assets
        variants: z.array(z.string()).optional(), // Color variants, size variants, etc.
        customProperties: z.record(z.string(), z.unknown()).optional(), // For any additional custom metadata
    }).optional(),
    price: z.number(),
    discountPrice: z.number().optional(),
    thumbnail: z.string(),
    previewUrl: z.string().optional(),
    fileUrl: z.string(),
    fileSize: z.number(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED", "REJECTED"]).optional(),
    isFeatured: z.boolean().optional(),
    version: z.string().optional()
})
