import express, { Router } from 'express';
import {RouterA} from './router';
// import { LoginServerApis } from '../child-server-apis/login-server-apis';
import { DatabaseService } from 'server-components'
import { environment } from "../environment"
import { BusinessServerApis, RegisterLoginServerApis } from '../child-server-apis';
import { ApiAuthorization } from '../api-authorization';

const app = express();
const router = Router();

const init = async () => {
    try {

        app.use(express.json());
        app.use('/api', router); 

        
        const db = new DatabaseService(environment.appServerMongodbConfig.dbName, environment.appServerMongodbConfig.clusterURL, environment.appServerMongodbConfig.userName, environment.appServerMongodbConfig.password);
        const PORT = environment.port;
        
        app.listen(PORT,async () => {
            await initialization(); 
        });
        
        async function initialization() {
            console.log(`Server is running on port ${PORT}`);
            await db.init();
            const registerLoginServerApis: RegisterLoginServerApis = new RegisterLoginServerApis(db.getUserDataService());
            const businessServerApis: BusinessServerApis =  new BusinessServerApis(db.getBusinessDataService(), db.getUserDataService(), db.getTeammemberPermissionDataService());
            const apiAuthorizatrion: ApiAuthorization = new ApiAuthorization(db);
            RouterA(router, registerLoginServerApis, businessServerApis, apiAuthorizatrion);
        }
        

    } catch (error) {
        console.error("Error during initialization:", error);
    }
};

export { app, init };
