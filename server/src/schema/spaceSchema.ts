import mongoose,{Document}from "mongoose";


interface space extends Document{
        name:string
        width:number
        height:number
        thumnail?:string
}

const Schema=mongoose.Schema

const spacesSchema= new Schema({
        name: {
            type:String,
        },
        dimensions:{
            type:String
        },
        mapId:{
            type:String
        }
})

export const spaceModel = mongoose.model<space>('space',spacesSchema)