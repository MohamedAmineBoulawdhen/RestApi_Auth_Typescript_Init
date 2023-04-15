import express from "express";

import {deleteUserById, getUserById, getUsers} from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response)=>{
    try {
const users = await getUsers();

return res.status(200).json(users)
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}

export const deleteUser=async (req: express.Request, res: express.Response) =>{
    try {
      const {id}=req.params;
      const deletedUser=await deleteUserById(id);  
      return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}
export const updateUser=async (req: express.Request, res: express.Response) =>{
    try {
        const {id}=req.params;
      const {userName}=req.body;

     if (!userName){
        return res.status(400).send({message:"uerName missing"});
     }

    const user = await getUserById(id);
    
    user.userName = userName;
    await user.save();
    return res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}