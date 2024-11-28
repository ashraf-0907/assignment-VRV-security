import { MongodbConnection } from "../../mongodb-connection";
import { MongodbUserConnector } from "../mongodb/mongodb-user-connector";
import { UserConnector } from "./user-connector";
import {User} from "common-model"

export class UserDataService {
    userConnector : UserConnector;
    
    constructor(mongodbConnection: MongodbConnection) {
        this.userConnector = new MongodbUserConnector(mongodbConnection);
    }

    async createUser(requestid:string, user:User):Promise<User>{
        let result: User = null
        if(user){
            try {
                result = await this.userConnector.createUser(user);
            } catch (error) {
                throw error;
            }
        }
        return result
    }

    async updateUser(requestid:string, user:User):Promise<any>{
        let result: User = null;
        if(user){
            try {
                result = await this.userConnector.updateUser(user);
            } catch (error) {
                throw error;
            }
        }
        return result;
    }

    async getUser(requsetid:string, userid:string):Promise<User>{
        let result: User = null;
        if(userid){
            try {
                result = await this.userConnector.getUser(userid);
            } catch (error) {
                throw error;
            }
        }

        return result;
    }

    async deleteUser(requestid:string, userid:string){
        if(userid){
            try {
                await this.userConnector.deleteUser(userid);
            } catch (error) {
                throw error;
            }
        }
    }

    async getUserByEmail(requestid:string, email:string):Promise<User>{
        console.log("service",email);
        let result: User = null;
        if(email){
            try {
                result = await this.userConnector.getUserByEmail(email);
            } catch (error) {
                throw error;
            }
        }

        return result;
    }

    
} 