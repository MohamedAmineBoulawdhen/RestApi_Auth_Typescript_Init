import express from "express";

import {get,merge} from "lodash"
import {getUserBySessionToken} from "../db/users"

export const isAuthenticated = async (req: express.Request, res: express.Response,next:express.NextFunction)=>{

    try {
        const sessionToken=req.cookies["AMINE-AUTH"]
        if (!sessionToken){
            return res.status(400).send({msg:"Session token is required"})
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser){
            return res.status(400).send({msg:"There is no user with the session token"})
        }
    merge(req,{identity:existingUser});
    return next();

    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:"authent error",})
    }

}

export const isOwner = (req: express.Request, res: express.Response,next:express.NextFunction)=>{
    try {
        const { id } = req.params;
        const currentUserId=get(req,"identity._id") as string;
        if (!currentUserId){
            return res.status(404).send({msg:"not logged in"});
        }
        if (currentUserId.toString()!=id){
            return res.status(404).send({msg:"not permitted as you are not the owner of this session"});
        }
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:"isOwner error",})
    }
}