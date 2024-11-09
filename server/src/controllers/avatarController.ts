import { Response , Request } from "express";
import { avatar } from "../schema/avatarschema";
class Avatar{
    async getallavatars(req:Request,res:Response){
         const avatars = await avatar.find()
         return res.status(200).json({
                avatars
         })

    }
}

export const avatars = new Avatar()