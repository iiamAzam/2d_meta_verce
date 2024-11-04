import mongoose, { mongo }  from "mongoose";
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
        }
})

export const mapSchema = mongoose.model<map>('map',mapScheama)