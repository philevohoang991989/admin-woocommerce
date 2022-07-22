import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../models/useModel";
import {httpStatusCodes} from "../helper";
import bcyptjs from "bcryptjs";


export const Users = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(User);

    const users = await repository.find({
            relations:['group']
        });

    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data: users.map(user=>{
            const {password, ...data} = user
            return data
        })
    });
}

export const CreateUser = async (req: Request, res: Response)=>{
    const {group_id, ...body} = req.body;

    const hashedPassword = await bcyptjs.hash(req.body.password, 10);

    const repository = getManager().getRepository(User);

    const { password, ...user} = await repository.save({
        ...body,
        password: hashedPassword,
        group_id: {
            id: group_id
        }
    })

    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data: user
    });
}

export const GetUser = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(User)

    const { password, ...user} = await repository.findOneBy(req.params)

    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data: user
    });
}
export const DeleteUser = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(User)

    await repository.delete(req.params)

    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data: {}
    });
}