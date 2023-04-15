const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    userName:{type:String, required:true},
    email:{type:String, required:true},
    authentication:{
        password:{type:String, required:true,select:false},
        salt:{type:String,select:false},
        sessionToken:{type:String,select:false}
    }
})

export const UserModel=mongoose.model('User',UserSchema)

export const getUsers=()=>UserModel.find();
export const getUserByEmail=(email:string)=>UserModel.findOne({email})
export const getUserById=(id:string)=>{
    const objectId=new mongoose.Types.ObjectId(id);
    return UserModel.findById(objectId)
}
export const getUserBySessionToken=(sessionToken:string)=>UserModel.findOne({
    "authentication.sessionToken": sessionToken, 
})
export const createUser=(values:Record<string,any>)=>new UserModel(values).save().
then((user:Record<string,any>)=>user.toObject())
export const deleteUserById=(id:string)=>UserModel.findOneAndDelete({_id:id});
export const updateUserById=(id:string,values:Record<string,any>)=>UserModel.findByIdAndUpdate(id,values);


