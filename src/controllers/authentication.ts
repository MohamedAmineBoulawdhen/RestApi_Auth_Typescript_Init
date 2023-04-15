import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import {random} from "../helpers/index"
import { authentication } from '../helpers/index';

export const register= async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password,userName} = req.body;
        if(!email||!password||!userName){
            return res.status(400).json({msg:"failed to register:all fields are required"});
        }
        const existingUser=await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({msg:"failed to register:email already exists"});
        }
       const salt = random();
       const user=await createUser({
            email,
            userName,
            authentication:{
                salt,
                password:authentication(salt,password)},
            })
            return res.status(200).json({msg:"success to register",user});
    } catch (error) {
           console.log(error);
           return res.status(400).json({msg:"register controller error",error: error.message});     
    }
}

export const login =async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({msg:"failed to login:all fields are required"});
        }
        const user=await getUserByEmail(email).select("+authentication.salt +authentication.password");
        if(!user){
            return res.status(400).json({msg:"failed to login"});
        }
        const expectedHash=authentication(user.authentication.salt,password)
        if (user.authentication.password !== expectedHash ){
            return res.status(400).json({msg:"failed to login: verify password"});
        }
        const salt= random();
        user.authentication.sessionToken=authentication(salt,user._id.toString());
        await user.save();
        res.cookie("AMINE-AUTH",user.authentication.sessionToken, { expires: new Date(Date.now() + (3600000*24)), httpOnly: true,domain:"localhost",path:"/" })
            return res.status(200).json({msg:"success to login",user});
    } catch (error) {
           console.log(error);
           return res.status(400).json({error: error.message});     
    }
}