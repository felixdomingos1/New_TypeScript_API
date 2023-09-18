import { Request, Response } from "express";
import { prisma } from "../../database";

export default{
    async createUser(req:Request, res:Response) {
        try {
            const { name, email} = req.body
            const userExist = await prisma.user.findUnique({where:{ email }});
            if(userExist) { 
                return res.json({message : 'User Existe'})
            }
            const user = await prisma.user.create({
                data:{
                    name,
                    email
                }
            })
            return res.json({
                message : 'User Cadastrad0',
                user
            })
        } catch (error) {
            res.json({message : error.message})
        }
    }, 
    async listUser(req:Request, res:Response) {
        try {
            const { id } = req.params
            const userExist = await prisma.user.findUnique({where:{ id:Number(id) }});
            if(!userExist) { 
                return res.json({message : 'User na0 Existe'})
            }
            return res.json({
                error : false,
                message : 'User enc0ntrad0',
                userExist
            })
        } catch (error) {
            res.json({message : error.message})
        }
    }, 
    async updateUser(req:Request, res:Response) {
        try {
            const { id , name, email} = req.body
            const userExist = await prisma.user.findUnique({where:{ id:Number(id) }});
            if(!userExist) { 
                return res.json({message : 'User na0 Existe'})
            }  
            const user = await prisma.user.update({
                where :{
                    id:Number(req.body.id)
                },
                data:{
                    name,
                    email
                }
            })
            return res.json({
                error : false,
                message : 'User atua1izad0',
                user
            })
        } catch (error) {
            res.json({message : error.message})
        }
    },
    async deleteUser(req:Request, res:Response) {

        try {
            const { id } = req.params 
            const userExist = await prisma.user.findMany({
                select : {
                    id : true
                }
            })
            if (!userExist) {
                return res.json({
                    error:true,
                    message : 'User nao encontrado',
                })
            }
            const user = await prisma.user.delete({
                where :{
                    id:Number(req.params.id)
                }
            })
            return res.json({
                error:false,
                message : 'sucess0 : User deletado',
                user
            })
        } catch (error) {
            res.json({message : error.message})
        }
    }
}