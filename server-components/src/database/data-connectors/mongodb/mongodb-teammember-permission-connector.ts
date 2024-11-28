import { DBCollectionMapper, TeammemberPermission } from "common-model";
import { TeammemberPermissionConnector } from "../teammeber-permission/teammember-permission-connector";
import { MongodbConnector } from "./mongodb-connector";
import { ObjectId } from "mongodb";
import { Role } from "common-model/model/teammember";


export class MongodbTeamemberPermissionConnector extends MongodbConnector implements TeammemberPermissionConnector {

    async createTeammemberPermission(teammemberPermission:TeammemberPermission){
        const id = new ObjectId()
        this.createDocument(DBCollectionMapper.ROLEPERMISSION, {_id: id.toHexString(), teammemberPermission});
        return teammemberPermission;
    }

    async getTeammemberPermission(businessid: string, role:Role){
        const res = await this.getDocument(DBCollectionMapper.ROLEPERMISSION, {
            "teammemberPermission.businessid":businessid,
             "teammemberPermission.teammemberType":role
        })
        console.log(res);
        return TeammemberPermission.fromJSON(res.teammemberPermission);
    }
    
    async updateTeammemberPermission(teammeberPermission: TeammemberPermission): Promise<any> {
        const response = this.updateOne(DBCollectionMapper.ROLEPERMISSION, {
            "teammemberPermission.businessid": teammeberPermission.businessid,
            "teammemberPermission.teammemberType" : teammeberPermission.teammemberType,
        }, {
            "$set":{
                "teammemberPermission": teammeberPermission,
            }
        });
        return response;
    }
}