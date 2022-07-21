import {Router} from "express";
import { Register , Login, AuthenticatedUser, Logout} from "../controllers/auth.controller";


export const routes =async (router: Router)=>{
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout',Logout)
    router.get('/api/user', AuthenticatedUser)
}