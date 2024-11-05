import { number, string } from "joi";
import mongoose, { mongo }  from "mongoose";
import { singleElement } from "./onlyelemt";
interface map extends Document{
        width : number 
        height : number ,
        name  : string
}

const Schema = mongoose.Schema 
const mapScheama = new Schema({
        width : {
              type:Number
          },
        height : {
                type:String
        },
        name  : {
                type:String
        },
        defaultElements:[
                {
                        elementId:{
                                type:mongoose.Schema.ObjectId,
                                ref:singleElement
                        },
                        x:{
                                type:Number
                        },
                        y: {
                                type:Number
                        }
                }
        ]
})

export const mapSchema = mongoose.model<map>('map',mapScheama)