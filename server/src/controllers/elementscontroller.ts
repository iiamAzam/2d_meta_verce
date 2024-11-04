import { Response,Request } from "express";
import { singleElement } from "../schema/onlyelemt";
import { error } from "console";

class Element{
    async getallelements(req:Request,res:Response){
            try {
                const elements = await singleElement.find()
                return res.status(200).json({
                    status:true,
                    elements
                })
            }catch (error){
                    return res.status(400).json({
                        status:false ,
                        error:error
                    })
            }
    }
}