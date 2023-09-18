import { Request, Response } from "express";
import { prisma } from "../../database";

export default{
    async createPost(req:Request, res:Response) {
        try {
            const { title, content, authorId} = req.body 
            const post = await prisma.post.create({
                data:{
                    title,
                    content,
                    authorId
                }
            })
            return res.json({
                message : 'Post Cadastrad0',
                post
            })
        } catch (error) {
            res.json({message : error.message})
        }
    }
}