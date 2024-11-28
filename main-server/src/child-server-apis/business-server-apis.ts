import { ApiResponse, Business, BusinessType, ServerMessage, TeammemberPermission, User } from "common-model";
import { Role, Teammember } from "common-model/model/teammember";
import { BusinessDataService, TeammemberPermissionDataService, UserDataService } from "server-components";

export class BusinessServerApis {
    businessDataService: BusinessDataService;
    userDataService: UserDataService;
    teammemberPermissionDataService:TeammemberPermissionDataService
    constructor(businessDataService: BusinessDataService, userDataService: UserDataService, teammemberPermissionDataService: TeammemberPermissionDataService){
        this.businessDataService = businessDataService;
        this.userDataService = userDataService;
        this.teammemberPermissionDataService = teammemberPermissionDataService;
    }

    async createBusiness(requestid:string, businessName: string, userid:string, businessType: BusinessType):Promise<ApiResponse>{
        const user:User = await this.userDataService.getUser(requestid, userid);
        let response:ApiResponse = null; 
        try {
            let business = Business.getDefaultBusiness();
            business.businessName = businessName;
            business.businessType = businessType;
            const teammember:Teammember= Teammember.getDefaultTeammember();
            teammember.role = Role.ADMIN;
            teammember.teammemberid = userid;
            business.teammebers.push(teammember);
            business = await this.businessDataService.createBusiness(requestid, business);
            this.createTeammemberPermissions(requestid, business.businessId);
            user.businessIds.push(business.businessId);
            await this.userDataService.updateUser(requestid,user);
            response = new ApiResponse(200, ServerMessage.SUCCESS,business);
        } catch (error) {
            response = new ApiResponse(500, ServerMessage.FAILED,error.message);
        }
        return response;
    }

    async addTeammember(requestid: string, teammemberEmail:string, teammeberRole: Role,businessid: string){
        let response:ApiResponse = null; 
        try { 
            const user: User = await this.userDataService.getUserByEmail(requestid, teammemberEmail);
            if(user){
                const business:Business = await this.businessDataService.getBusiness(requestid, businessid);
                business.teammebers.push(new Teammember(user.userId, teammeberRole));
                await this.businessDataService.updateBusiness(requestid, business);
                response = new ApiResponse(200, ServerMessage.SUCCESS, "Teammember Added Successfully");
            }else {
                response = new ApiResponse(401, ServerMessage.FAILED, "User does not exist");
            }
        } catch (error) {
            response = new ApiResponse(500, ServerMessage.FAILED,error.message);
        }
        return response;
    }

    private async createTeammemberPermissions(requestid:string, businessid: string){
        const adminPermission:TeammemberPermission = TeammemberPermission.getDefaultTeammemberPermission(Role.ADMIN);
        const dileveryBoyPermission: TeammemberPermission = TeammemberPermission.getDefaultTeammemberPermission(Role.DILEVERY_BOY);
        const cookPermission: TeammemberPermission = TeammemberPermission.getDefaultTeammemberPermission(Role.COOK);
        adminPermission.businessid = businessid;
        dileveryBoyPermission.businessid = businessid;
        cookPermission.businessid = businessid;
        
        const promises= [];

        promises.push(this.teammemberPermissionDataService.createTeammemberPermission(requestid, adminPermission));
        promises.push(this.teammemberPermissionDataService.createTeammemberPermission(requestid, dileveryBoyPermission));
        promises.push(this.teammemberPermissionDataService.createTeammemberPermission(requestid, cookPermission));

        await Promise.all(promises);

    }
}