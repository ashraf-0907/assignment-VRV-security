import { Role } from "common-model/model/teammember";
import { MongodbConnection } from "../../mongodb-connection";
import { MongodbTeamemberPermissionConnector } from "../mongodb/mongodb-teammember-permission-connector";
import { TeammemberPermissionConnector } from "./teammember-permission-connector";
import { TeammemberPermission } from "common-model"

export class TeammemberPermissionDataService {
    teammemberPermissionConnector: TeammemberPermissionConnector;

    constructor(mongodbConnection:MongodbConnection){
        this.teammemberPermissionConnector = new MongodbTeamemberPermissionConnector(mongodbConnection);
    }

    async createTeammemberPermission(requestid:string, teammeberPermission: TeammemberPermission):Promise<TeammemberPermission>{
        let response: TeammemberPermission =  null;
        try {
            response = await this.teammemberPermissionConnector.createTeammemberPermission(teammeberPermission);
        } catch (error) {
            throw error;
        }
        return response;
    }

    async getTeammemberPermission(requestid:string, businessid:string, role:Role):Promise<TeammemberPermission>{
        let response: TeammemberPermission =  null;
        try {
            response = await this.teammemberPermissionConnector.getTeammemberPermission(businessid, role);
        } catch (error) {
            throw error;
        }
        return response;
    }

    async updateTeammemberPermission(requestid:string, teammemberPermission:TeammemberPermission) {
        let response = null;
        try {
            response = this.teammemberPermissionConnector.updateTeammemberPermission(teammemberPermission);
        } catch (error) {
            throw error;
        }
        return response;
    }
}