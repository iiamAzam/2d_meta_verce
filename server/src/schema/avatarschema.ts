import mongoose from "mongoose";
interface avatar extends Document{
    imageUrl:string,
    name: string
}

const Schema = mongoose.Schema

const avatarSchema=new Schema({
    imageUrl:{
        type : String
    },
    name: {
        type:String
    }
})

export const avatar = mongoose.model('avatar',avatarSchema)