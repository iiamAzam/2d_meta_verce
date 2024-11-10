import { Response , Request } from "express";
import { avatar } from "../schema/avatarschema";
class Avatar{
    async getallavatars(req:Request,res:Response){
         
        try{
        const avatars = await avatar.find()
         return res.status(200).json({
                avatars
         })
        }catch(error){
            return res.status(500).json({message:error})
        }
    }
}

export const avatars = new Avatar()