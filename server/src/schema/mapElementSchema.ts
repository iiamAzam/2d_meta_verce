import  mongoose from "mongoose";
import { mapSchema } from "./mapScheama";
import { singleElement } from "./onlyelemt";
interface mapelements extends Document{
       mapId:string,
       elementId: string, 
       x: 10, 
       y: 20 
}

const Schema= mongoose.Schema
const mapelements=new Schema({
    mapId:{
        type:mongoose.Schema.ObjectId,
        ref:mapSchema
    },
    elementId: {
        type:mongoose.Schema.ObjectId,
        ref:singleElement
    }, 
    x: {
        type:String
    }, 
    y: {
        type:String
    }
})

export const mapelement = mongoose.model('mapelement', mapelements)