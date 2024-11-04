import mongoose, {Document} from "mongoose";

enum Role {     
        Admin="Admin",
        User="User"
}

interface auth extends Document{
        username:string,
        password:string,
        avatarId?:string,
        role: Role
}



const Schema = mongoose.Schema

const userSchema = new Schema ({
        username:{
            type :String,
            required: true 
        },
        password: {
                type:String,
                require:true
        },
        avatarId:{
                type:String
        },
        role: {
                type: String,
                enum: ['Admin', 'User'], 
                required: true,
              },

})

export default mongoose.model<auth>('user',userSchema)