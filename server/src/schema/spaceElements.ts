import { ref } from "joi";
import mongoose ,{ Document} from "mongoose";       
import { spaceModel } from "./spaceSchema";
import { singleElement } from "./onlyelemt";
interface elements extends Document{
        elementId:string,
        spaceid:string,
        x:number,
        y:number
}

const Schema = mongoose.Schema
const elementsSchema=new Schema({
     elementid:{
            type:mongoose.Schema.ObjectId,
            ref:singleElement
     },
     spaceid:{
        type :mongoose.Schema.ObjectId,
        ref:spaceModel

     },
     x:{
        type:String 
     },
     y: {
        type:String
     }
     
})

export const spacelement=mongoose.model<elements>('element',elementsSchema)