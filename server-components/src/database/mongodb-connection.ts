import { MongoClient, Db } from "mongodb"

export class MongodbConnection {
    private mongoClient = MongoClient;
    protected db: Db;
    protected client: MongoClient | null;
    private static readonly SIGNATURE = "MongodbConnection";

    mongodbConfig: {
        dbName: string,
        clusterURL: string,
        userName: string,
        password: string,
    };

    constructor(
        mongodbConfig: {
            dbName: string,
            clusterURL: string,
            userName: string,
            password: string
        }){
        this.mongodbConfig = mongodbConfig;
    }


    private mongodbURLString ():string {
        return `mongodb+srv://${this.mongodbConfig.userName}:${this.mongodbConfig.password}@${this.mongodbConfig.clusterURL}/${this.mongodbConfig.dbName}?retryWrites=true&w=majority`
    }

    public async init(){
        const mongodbUrl = this.mongodbURLString();
        this.client = new this.mongoClient(mongodbUrl);
        console.log("here");
        try {
            await this.client.connect();
            if(this.client.db(this.mongodbConfig.dbName)){
                console.log("DB-Connected");
                this.db = this.client.db(this.mongodbConfig.dbName);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public getDb(): Db {
        if (!this.db) {
            throw Error('Database not initialised');
        }
        return this.db;
    }

    checkMongoDbClientConnection() {
        let isMongodbClientAvailable = false;
        if (this.client) {
            isMongodbClientAvailable = true;
        }
        return isMongodbClientAvailable;
    }

    public async cleanUp(): Promise<void> {
        if (this.client) {
            await this.client.close();
            this.client = null;
        }
    }

} 