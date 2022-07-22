import express from "express"
import {routes} from "./src/routes"
import {createConnection} from "typeorm";
import cookieParser from "cookie-parser";


createConnection().then(connection => {
    const app = express();
    const cors = require('cors');
    app.use(express.json());
    app.use(cookieParser());

    routes(app);

    app.listen(8000,()=>{
        console.log('listening to port 8000')
    })
    app.use(cors({
        origin: ['localhost:3000/api/']
    }))
});
