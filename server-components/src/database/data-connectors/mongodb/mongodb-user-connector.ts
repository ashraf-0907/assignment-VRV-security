import { ObjectId } from "mongodb";
import { UserConnector } from "../user/user-connector";
import { MongodbConnector } from "./mongodb-connector";
import { User, DBCollectionMapper, LogicalFilterKeyword } from "common-model";

export class MongodbUserConnector extends MongodbConnector implements UserConnector {

    async createUser(user: User): Promise<User> {
        user.userId = (new ObjectId()).toHexString();
        await this.createDocument(DBCollectionMapper.USERS, { _id: user.userId, user });
        return user;
    }

    async updateUser(user: User): Promise<any> {
        const result = await this.updateOne(DBCollectionMapper.USERS, {
            "user.userId": user.userId,
        }, {
            "$set":{
                "user" : user
            }
        });
        return result.modifiedCount;
    }

    async deleteUser(userid: string): Promise<void> {
        await this.deleteDocument(DBCollectionMapper.USERS, {
            "user.userId": userid
        });
        return;
    }

    async getUser(userid: string): Promise<User> {
        const response =  await this.getDocument(DBCollectionMapper.USERS, { "user.userId": userid });
        return User.fromJSON(response?.user);
    }

    async getUserByEmail(email: string): Promise<User> {
        console.log("here in mongodb");
        const response =  await this.getDocument(DBCollectionMapper.USERS, {
            [LogicalFilterKeyword.OR]: [
                {
                    "user.email": email,
                },
            ]
        }
        );
        console.log(response);
        return User.fromJSON(response?.user);
    }

}