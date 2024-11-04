import { Response,Request } from "express";
import  useDb from '../schema/userschema'
import userschema from "../schema/userschema";

class Usermetadata{
    async updatedata(req:Request,res:Response){
            const {avatarId,token}=req.body
            const id=token. _doc._id
            const findandupdat = await useDb.findByIdAndUpdate(id,{$set:{avatarId:avatarId}}, { new:true, fields:{ avatarId: 1 }})
            console.log(findandupdat)
            res.status(200).json({
                findandupdat
            })
    }
    async getalldata(req:Request,res:Response){

            const users=await useDb.find()
            return res.status(200).json({
                users
            })
    }
}

export const {updatedata}=new Usermetadata()