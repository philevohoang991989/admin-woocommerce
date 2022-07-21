import {Router} from "express";
import { Register , Login, AuthenticatedUser, Logout} from "../controllers/auth.controller";
import {AuthMiddleware} from "../middlewares/auth.middleware";


export const routes =async (router: Router)=>{
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', AuthMiddleware,Logout)
    router.get('/api/user',AuthMiddleware, AuthenticatedUser)
}