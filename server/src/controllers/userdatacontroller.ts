import { Response,Request } from "express";
import  useDb from '../schema/userschema'

class Usermetadata{
    async updatedata(req:Request,res:Response){
            const {avatarId,token}=req.body
            console.log(token.role)
          // const findandupdat = await useDb.findByIdAndUpdate()

    }
}

export const {updatedata}=new Usermetadata()