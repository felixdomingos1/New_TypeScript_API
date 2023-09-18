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
    }
}