import {Router} from "express";
import { Register , Login} from "../controllers/auth.controller";


export const routes =async (router: Router)=>{
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    // router.get('/api/user', AuthenticatedUser)
}