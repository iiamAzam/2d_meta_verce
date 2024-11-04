import mongoose from "mongoose";
interface singleelement extends Document{
        width: number ,
        height: number , 
        imageUrl : string
}
const Schema = mongoose.Schema
const singleElementSchema= new Schema ({
        width : {
                type : Number
        },
        height : {
                type : Number
        },
        imageUrl:{
                type : Number 
        }
})

export const singleElement= mongoose.model<singleelement>('singleElement',singleElementSchema)