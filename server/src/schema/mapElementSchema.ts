import  mongoose from "mongoose";
interface mapelements extends Document{
       mapId:string,
       elementId: string, 
       x: 10, 
       y: 20 
}

const Schema= mongoose.Schema
const mapelements=new Schema({
    mapId:{
        type:String
    },
    elementId: {
        type:String
    }, 
    x: {
        type:String
    }, 
    y: {
        type:String
    }
})

export const mapelement = mongoose.model('mapelement', mapelements)