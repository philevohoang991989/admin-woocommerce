import {Request, Response} from "express";
import bcyptjs from 'bcryptjs'
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {sign, verify} from 'jsonwebtoken'
import {User} from "../models/useModel";

export const Register = async (req: Request, res: Response)=>{
    const body = req.body;
    const repository = getManager().getRepository(User);
    const {error} = RegisterValidation.validate(body);

    const email = await repository.findOneBy({email: req.body.email});
    const phone = await repository.findOneBy({phone: req.body.phone});
    const username = await repository.findOneBy({username: req.body.username})
    if(username){
        return res.status(404).send({
            message:'Username already exists'
        })
    }

    if(email){
        return res.status(404).send({
            message: 'Email already exists'
        })
    }

    if(phone){
        return res.status(404).send({
            message: 'Phone already exists'
        })
    }

    if(error){
        return res.status(400).send(error.details)
    }

    if(body.password !== body.password_confirm){
        return  res.status(400).send({
            message:"Password's do not match"
        })
    }

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
    },process.env.SECRET_KEY)

    res.cookie('jwt',token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    const {password, ...data} = user

    res.send({
        message: 'success'
    });
}

export const UserList = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(User);
    const listUser = await repository.find();
    res.send(listUser)
}

export const AuthenticatedUser = async (req: Request, res: Response)=>{
    const {password, ...user} = req['user']
    res.send(user)
}

export const Logout = async (req: Request, res: Response)=>{
   res.cookie('jwt','',{maxAge: 0});
   res.send({
       message: 'success'
   })
}