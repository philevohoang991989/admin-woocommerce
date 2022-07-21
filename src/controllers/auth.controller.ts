import {Request, Response} from "express";
import bcyptjs from 'bcryptjs'
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {sign, verify} from 'jsonwebtoken'
import {User} from "../models/useModel";

export const Register = async (req: Request, res: Response)=>{
    const body = req.body;

    const {error} = RegisterValidation.validate(body);

    if(error){
        return res.status(400).send(error.details)
    }
    if(body.password !== body.password_confirm){
        return  res.status(400).send({
            message:"Password's do not match"
        })
    }
    if(!body.phone.match(/^\d+\.?\d*$/)){
        return res.status(400).send({
            message:"phone not match"
        })
    }

    const repository = getManager().getRepository(User);

    const {password, ...user} = await repository.save({
        username: body.username,
        password: await bcyptjs.hash(body.password, 10),
        avatar: body.avatar,
        full_name: body.full_name,
        email: body.email,
        status: body.status,
        phone: body.phone,
        role: body.role,
    })

    res.send(user);
}
export const Login = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(User);
    const user = await repository.findOneBy({email: req.body.email});
    if(!user){
        return res.status(404).send({
            message: 'user not found'
        })
    }
    if(!await bcyptjs.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: 'invalid password'
        })
    }
    const token = sign({
        id: user.id
    },"secret")

    res.cookie('jwt',token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    const {password, ...data} = user

    res.send({
        message: 'success'
    });
}
// export const AuthenticatedUser = async (req: Request, res: Response)=>{
//     const jwt = req.cookies['jwt'];
//
//     const payload: any = verify(jwt,"secret")
//
//     if(!payload){
//         return res.status(401).send({
//             message:'unauthenticated'
//         })
//     }
//     const repository = getManager().getRepository(User);
//
//     const {password, ...user} = await repository.findOneBy(payload.id)
//
//     res.send(user)
//
// }