import {User} from "common-model"

export interface UserConnector {
    createUser(user:User):Promise<User>;
    updateUser(user:User):Promise<any>;
    deleteUser(userid:string):Promise<void>;
    getUser(userid:string):Promise<User>;
    getUserByEmail(email:string):Promise<User>;
}