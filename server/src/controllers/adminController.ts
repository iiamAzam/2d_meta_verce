import {Response,Request} from 'express'
import { singleElement } from '../schema/onlyelemt'
import { avatar } from '../schema/avatarschema'
import { mapSchema } from '../schema/mapScheama'

class Admin {
     async createElement(req:Request,res:Response){
         const {imageUrl,width,height, is_static} = req.body
        try {
         const newElement=new singleElement({
            imageUrl,
            width,
            height,
            is_static
         })
        const id = await newElement.save()
         res.status(200).json({
            status:true,
            message:'element created successfully',
            id
         })
        }catch (error){
            return res.status(400).json({
                error
            })
        }
     }
    async updateElement (req:Request,res:Response){
                const id=req.params.elementId
                const {  imageUrl} = req.body
                const updateelement = await singleElement.findByIdAndUpdate(id,{$set:{imageUrl:imageUrl}},{new:true})
                if (!updateelement){
                    return res.status(400).json({
                        status:false,
                        message: "the element not found"
                    })
                }
                return res.status(200).json({
                        status:false,
                         message:"element updated"
                })
    }
      async creatAvatar(req:Request,res:Response){
            const {imageUrl,name} = req.body
            try{
                const newAvatar = new avatar({
                    imageUrl,
                    name
                }) 
                const avatarid =await newAvatar.save()
                return res.status(200).json({
                        status:true,
                        message:"the avatar is created successfully" ,  
                        avatarid
                })
            }catch(error){
                return res.status(400).json({
                status: false,
                message : 'somthing went wrong',
                error
                })
            }
      }
      async creatMap(req:Request,res:Response){
            const {width,height,name,defaultElements} = req.body
            try {
                const newMap = new mapSchema({
                    width,
                    height,
                    name,
                    defaultElements
                })
                const mapId=await newMap.save()
                return res.status(200).json({
                    mapId
                })

            }catch(error){
                return res.status(404).json({
                        status:false,
                        message:'somthing went wrong',
                        error
                })
            }
      }

}

export const adminController = new Admin()