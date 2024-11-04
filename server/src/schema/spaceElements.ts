import mongoose ,{ Document} from "mongoose";       
interface elements extends Document{
        elementId:string,
        spaceid:string,
        x:number,
        y:number
}

const Schema = mongoose.Schema
const elementsSchema=new Schema({
     elementid:{
            type :String ,
     },
     spaceid:{
        type :  String

     },
     x:{
        type:String 
     },
     y: {
        type:String
     }
     
})

export const element=mongoose.model<elements>('element',elementsSchema)