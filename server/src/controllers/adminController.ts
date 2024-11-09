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
                console.log(id)
                const {imageUrl} = req.body
                const updateelement = await singleElement.findByIdAndUpdate(id,{$set:{imageUrl:imageUrl}},{new:true})
                if (!updateelement){
                    return res.status(400).json({
                        status:false,
                        message: "the element not found"
                    })
                }
                return res.status(200).json({
                        status:true,
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
      async getavatar(req:Request, res:Response){
        try{
            const av = await avatar.find()
            if(!av){
                return res.status(400).json({
                    status:false,
                    message: "no avatar found"
                  })
            }
            return res.status(200).json({
              
                av  
            
            })

             
        }
        catch (error){
                return res.status(403).json({
                        status:false ,
                        message : 'somthing went wrong',
                        error
                })
        }
    }

      async creatMap(req:Request,res:Response){
            const { thumbnail,dimention,name,defaultElements} = req.body
            try {
                
                const newMap = new mapSchema({
                    thumbnail,
                    width:parseInt(dimention.split('x')[0]),
                    height:parseInt(dimention.split('x')[1]),
                    name,
                    defaultElements
                })
                const mapId=await newMap.save()
                return res.status(200).json({
                    mapId:mapId._id
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