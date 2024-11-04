import { Response , Request } from "express";
import { avatar } from "../schema/avatarschema";
class Avatar{
    async getallavatars(req:Request,res:Response){
         const all_avatars = await avatar.find()
         return res.status(200).json({
                all_avatars
         })

    }
}

export const avatars = new Avatar()