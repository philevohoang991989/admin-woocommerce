import {Request, Response} from "express";
import bcyptjs from 'bcryptjs'
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {sign} from 'jsonwebtoken'
import {User} from "../models/useModel";
import {httpStatusCodes} from  "../helper"
import {bodyUser} from "../@types/global.type"

export const Register = async (req: Request, res: Response)=>{
    const body:bodyUser = req.body;
    const repository = getManager().getRepository(User);
    const {error} = RegisterValidation.validate(body);
    if(error){
        return res.status(httpStatusCodes.BAD_REQUEST).send(error.details)
    }

    if(body.password !== body.password_confirm){
        return  res.status(httpStatusCodes.BAD_REQUEST).send({
            message:"Password's do not match"
        })
    }
    const email = await repository.findOneBy({email: req.body.email});
    const phone = await repository.findOneBy({phone: req.body.phone});
    const username = await repository.findOneBy({username: req.body.username})

    const type_error = username?"Username":email?"Email":phone?"Phone":""

    if(type_error){
        return res.send({
            status: httpStatusCodes.NOT_FOUND,
            message: `${type_error} already exists`
        });
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
    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data: user
    });
}
export const Login = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(User);
    const user = await repository.findOneBy({email: req.body.email});
    if(!user){
        return res.send({
            message: 'user not found',
            status: httpStatusCodes.NOT_FOUND,
        });
    }
    if(!await bcyptjs.compare(req.body.password, user.password)){
        return res.send({
            message: 'invalid password',
            status: httpStatusCodes.BAD_REQUEST,
        });
    }
    const token = sign({
        id: user.id
    },process.env.SECRET_KEY)

    res.cookie('jwt',token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data:{
            access_token: token,
            live_token: 24 * 60 * 60 * 1000
        }
    });
}

export const AuthenticatedUser = async (req: Request, res: Response)=>{
    const {password, ...user} = req['user']
    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data: user
    })
}

export const Logout = async (req: Request, res: Response)=>{
   res.cookie('jwt','',{maxAge: 0});
   res.send({
       message: 'success',
       status: httpStatusCodes.OK,
       data:{}
   })
}

export const UpdateInfo = async (req: Request, res: Response)=>{
    const user = req['user']

    const repository = getManager().getRepository(User);

    await repository.update(user.id, req.body);

    const {password, ...data} = await repository.findOneBy(user.id)
    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data
    })
}