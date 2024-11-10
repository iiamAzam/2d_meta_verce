import { Response,Request } from "express";
import  useDb from '../schema/userschema'
import { avatar } from "../schema/avatarschema";

class Usermetadata{
    async updatedata(req:Request,res:Response){
            const {avatarId,token}=req.body
            const id=token. _doc._id
            const isavatarexist=await avatar.findOne({avatarId})
            if (!isavatarexist){
                return res.status(400).json({message:"Avatar not found"})
            }
            const findandupdat = await useDb.findByIdAndUpdate(id,{$set:{avatarId:avatarId}}, { new:true, fields:{ avatarId: 1 }})
            res.status(200).json({
                findandupdat
            })
    }
    async getalldata(req:Request,res:Response){
           try{
            const users=await useDb.find()
            return res.status(200).json({
                users
            })}
            catch(error){
                return res.status(400).json({
                    status:false,
                    message:error
                })
    }
}
}

export const {updatedata,getalldata}=new Usermetadata()