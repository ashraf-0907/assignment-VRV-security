import express from "express"
import { heartbeat, registerLoginRoute } from "./child-routes"
import { BusinessServerApis, RegisterLoginServerApis } from "../child-server-apis";
import { businessRoutes } from "./child-routes/business-routes";
import { ApiAuthorization } from "../api-authorization";
// import { LoginServerApis } from "../child-server-apis/login-server-apis";
    export function RouterA(
        router: express.Router,
        registerLoginServerApis: RegisterLoginServerApis,
        businessServerApis: BusinessServerApis,
        apiAuthorization: ApiAuthorization,
    ){
        // router.use() // any middleware...
        heartbeat(router);
        registerLoginRoute(router, registerLoginServerApis);
        businessRoutes(router, businessServerApis,apiAuthorization);

}