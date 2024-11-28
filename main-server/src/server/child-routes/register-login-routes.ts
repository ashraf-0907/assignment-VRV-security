import { Request, Router } from "express";
import { RegisterLoginServerApis } from "../../child-server-apis";
import { ServerMessage } from "common-model";

export async function registerLoginRoute(
    router:Router,
    registerLoginServerApis : RegisterLoginServerApis
){

    router.post("/register",async (req,res)=>{

        console.log(req.body);

        const username:string = req.body.username;
        const password:string = req.body.password;
        const email:string = req.body.email;
        const phoneNumber: string = req.body.phoneNumber;

        if(username && password && email && phoneNumber){
            try {
                const response = await registerLoginServerApis.registerUser(getRequestId(req), username, password, email, phoneNumber);
                res.status(response.status).send(response.data);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }else {
            res.status(402).send(ServerMessage.PARAMETER_MISSING);
        }
    })

    router.post("/login",async (req,res)=>{

        const email:string = req.body.email;
        const password:string = req.body.password;

        if(email && password){
            try {
                const response = await registerLoginServerApis.loginUser(getRequestId(req), email, password);
                res.status(response.status).send(response.data);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }else {
            res.status(402).send(ServerMessage.PARAMETER_MISSING);
        }
    })



}

function getRequestId(req: any) {
    return req.id
}

