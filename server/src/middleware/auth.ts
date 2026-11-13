import {Request,Response,NextFunction} from 'express';import jwt from 'jsonwebtoken';
export interface AuthedRequest extends Request {user?:any}
export function auth(req:AuthedRequest,res:Response,next:NextFunction){const token=req.headers.authorization?.replace('Bearer ','');if(!token)return res.status(401).json({message:'Authentication required'});try{req.user=jwt.verify(token,process.env.JWT_SECRET||'foodlink_dev_secret_change_me');next()}catch{return res.status(401).json({message:'Invalid token'})}}
export function roles(...allowed:string[]){return(req:AuthedRequest,res:Response,next:NextFunction)=>{if(!req.user||!allowed.includes(req.user.role))return res.status(403).json({message:'You do not have permission'});next()}}
