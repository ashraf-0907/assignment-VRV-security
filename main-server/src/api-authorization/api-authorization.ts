import { Business, TeammemberPermission } from "common-model";
import { Role, Teammember } from "common-model/model/teammember";
import { DatabaseService } from "server-components";
import { BusinessServerApis } from "../child-server-apis";

export class ApiAuthorization {

    db:DatabaseService;
    constructor(db: DatabaseService){
        this.db = db;
    }

    async addTeammember(requestid: string, userid:string, businessid:string):Promise<boolean>{
        let res = false;
        console.log(userid);
        try {
            const business: Business = await this.db.getBusinessDataService().getBusiness(requestid, businessid);
            const teammeber:Teammember = business?.teammebers?.find(teammember => teammember.teammemberid === userid); 
            const teammeberPermission: TeammemberPermission = await this.db.getTeammemberPermissionDataService()?.getTeammemberPermission(requestid, businessid, teammeber.role);
            console.log(teammeberPermission);
            return teammeberPermission.canAddTeammember;
        } catch (error) {
            throw error;
        }
    }
}