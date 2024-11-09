import { Response,Request } from "express";
import  useDb from '../schema/userschema'
import { stat } from "fs";

class Usermetadata{
    async updatedata(req:Request,res:Response){
            const {avatarId,token}=req.body
            const id=token. _doc._id
            const findandupdat = await useDb.findByIdAndUpdate(id,{$set:{avatarId:avatarId}}, { new:true, fields:{ avatarId: 1 }})
            if(!findandupdat){
                return res.status(400).json({
                    status:false,
                    message:"ok this is not working"
                })
            }
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