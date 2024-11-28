import { TeammemberPermission } from "common-model";
import { BusinessDataService, TeammemberPermissionDataService } from "./data-connectors";
import { UserDataService } from "./data-connectors/user";
import { DatabaseInterface } from "./database-interface";
import { MongodbConnection } from "./mongodb-connection";

export class DatabaseService implements DatabaseInterface {

    mongoDBConnection: MongodbConnection;
    mongodbConfig: {
        dbName: string,
        clusterURL: string,
        userName: string,
        password: string
    };

    protected userDataService: UserDataService ;
    protected businessDataService: BusinessDataService;
    protected teammemberPermissionDataService: TeammemberPermissionDataService;

    constructor(
        
            dbName: string,
            clusterURL: string,
            userName: string,
            password: string
    ){
        this.mongodbConfig = {dbName, clusterURL, userName, password};
    }

    public async init(): Promise<void> {
        await this.initMongoDB();
        this.userDataService = new UserDataService(this.mongoDBConnection);
        this.businessDataService = new BusinessDataService(this.mongoDBConnection);
        this.teammemberPermissionDataService = new TeammemberPermissionDataService(this.mongoDBConnection);

    }

    public async cleanUp(): Promise<void> {
        await this.mongoDBConnection.cleanUp();
    }

    public getUserDataService():UserDataService{
        return this.userDataService
    }

    public getBusinessDataService(): BusinessDataService {
        return this.businessDataService;
    }

    public getTeammemberPermissionDataService(): TeammemberPermissionDataService {
        return this.teammemberPermissionDataService;
    }

    private async initMongoDB() {
        try {
            this.mongoDBConnection = new MongodbConnection(this.mongodbConfig);
            await this.mongoDBConnection.init();
        } catch (error) {
            console.log(error);
        }
    }
}