import { Router } from "express";


export function heartbeat(
    router: Router
){
    router.get("/heartbeat", async (req, res)=>{
        try {
            res.send('❤️❤️❤️❤️❤️ v30Oct');
        } catch (error) {
            console.log(error);
            res.status(503).send('💔💔');
        }
    });

}