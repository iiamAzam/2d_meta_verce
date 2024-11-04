import {Response,Request} from 'express'
import { spaceModel } from '../schema/spaceSchema'

class Space {
        async createspace(req:Request,res:Response){
            const {name,width,height,thumnail}=req.body
            try {
                const new_space= new spaceModel({
                        name,width,height,thumnail
                })
               const spaceid=await new_space.save()
               return res.status(200).json({
                    status:true,
                    spaceID:spaceid._id
               })



            }catch (error){
                return res.status(400).json({
                    status : false,
                    message : 'somthing wrong',
                })

            }
            
        }

        async spaceDelete(req:Request,res:Response){
                    const spaceId=req.params.spaceId
                   try {
                    const result = await spaceModel.deleteOne({spaceId})
                    return res.status(200).json (
                        {
                            status : true ,
                            message : result
                        }

                    )}
                    catch (error){
                            return res.status (400).json({
                                    status :false,
                                    message : "somthing went wrong ",
                                    error: error
                            })
                    }   
        }

        async getall(req:Request,res:Response){
            const spaceId=req.params.spaceId
           try {
            const result = await spaceModel.find({spaceId})
            return res.status(200).json (
                {
                    status : true ,
                    message : result
                }

            )}
            catch (error){
                    return res.status (400).json({
                            status :false,
                            message : "somthing went wrong ",
                            error: error
                    })
            }   }

}

export const space = new Space()