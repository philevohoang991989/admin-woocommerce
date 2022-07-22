import {Router} from "express";
import {Register, Login, AuthenticatedUser, Logout, UpdateInfo, UpdatePassword} from "../controllers/auth.controller";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {CreateUser, DeleteUser, GetUser, Users} from "../controllers/user.controller";


export const routes =async (router: Router)=>{
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', AuthMiddleware,Logout)
    router.get('/api/user',AuthMiddleware, AuthenticatedUser)
    router.put('/api/user/info', AuthMiddleware, UpdateInfo)
    router.put('/api/user/password', AuthMiddleware, UpdatePassword)

    router.get('/api/users',AuthMiddleware, Users)
    router.post('/api/users',AuthMiddleware, CreateUser)
    router.get('/api/users/:id',AuthMiddleware, GetUser)
    router.delete('/api/users/:id',AuthMiddleware, DeleteUser)
}