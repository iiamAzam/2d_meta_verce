import {Response,Request} from 'express'
import { spaceModel } from '../schema/spaceSchema'
import {spacelement} from '../schema/spaceElements'

class Space {
        async createspace(req:Request,res:Response){
            const {name,dimensions,mapId,thumnail}=req.body
            try {
                if(!dimensions){
                    return res.status(400).json({message:"Dimensions are required"})
                }

                const new_space=new spaceModel({
                            name,
                            dimensions,
                            thumnail,
                            mapId
                })
               const spaceid=await new_space.save()
               return res.status(200).json({
                    spaceId:spaceid._id
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

        async getaspace(req:Request,res:Response){
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

            async getall(req:Request,res:Response){
               try {
                const spaces = await spaceModel.find()
                return res.status(200).json (
                    {
                         spaces
                    }

                )}
                catch (error){
                        return res.status (400).json({
                                status :false,
                                message : "somthing went wrong ",
                                error: error
                        })
                }   }
         async createElement(req:Request,res:Response){
            const {elementid,spaceid,x,y}=req.body
            try{
                const newSpace= new spacelement({
                    elementid,
                    spaceid,
                    x,
                    y
                })
                await newSpace.save()
                return res.status(200).json({
                    status:true,
                })

            }catch (eror ){
                return res.status(400).json({
                        status:false
                })
            }

         }
         // need to impliment delete an element

}

export const space = new Space()
