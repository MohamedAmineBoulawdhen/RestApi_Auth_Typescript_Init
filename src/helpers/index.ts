import crypto from "crypto";
const Secret="TypeScriptInitiator"
export const random=()=>crypto.randomBytes(128).toString("base64")
export const authentication=(satlt:string,password:string)=>{
    return crypto.createHmac("sha256",[satlt,password].join("/")).update(Secret).digest("hex")
}