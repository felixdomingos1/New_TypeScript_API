import { Request, Response } from "express";
import { prisma } from "../../database";

export default{
    async createPost(req:Request, res:Response) {
        try {
            const { title, content, authorId} = req.body 
            const userExist = await prisma.user.findUnique({where:{ id : Number(authorId) }})
            if (!userExist) {
                return res.json({
                    error: true,
                    message : 'Post na0 Cadastrad0 user na0 existe',
                })
            }
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
    },
    async listPost(req:Request, res:Response) {
        try {
            const { id } = req.params
            const post = await prisma.post.findUnique({where:{ id : Number(id) }})
            if (!post) {
                return res.json({
                    error:true,
                    message : 'Post nao encontrado',
                })
            }
            return res.json({
                error:false,
                post
            })
        } catch (error) {
            res.json({message : error.message})
        }
    },
    async updatePost(req:Request, res:Response) {
        try {
            const { id, title, content} = req.body 
            const postExist = await prisma.post.findUnique({where:{ id : Number(id) }})
            if (!postExist) {
                return res.json({
                    error:true,
                    message : 'Post nao encontrado',
                })
            }
            const post = await prisma.post.update({
                where :{
                    id:Number(req.body.id)
                },
                data:{
                    title,
                    content
                }
            })
            return res.json({
                error:false,
                message : 'sucess0 : Post atualizado',
                post
            })
        } catch (error) {
            res.json({message : error.message})
        }
    },
    async deletePost(req:Request, res:Response) {

        try {
            const { id , authorId} = req.params 
            const userExist = await prisma.user.findUnique({where:{ id : Number(authorId) }})
            const postExist = await prisma.post.findUnique({where:{ id : Number(id) }})
            if (!postExist) {
                return res.json({
                    error:true,
                    message : 'Post nao encontrado',
                })
            }
            const post = await prisma.post.delete({
                where :{
                    id:Number(req.params.id)
                }
            })
            return res.json({
                error:false,
                message : 'sucess0 : Post deletado',
                post
            })
        } catch (error) {
            res.json({message : error.message})
        }
    }
}