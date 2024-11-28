import { Business } from "common-model";

export interface BusinessConnector {
    createBusiness(business:Business):Promise<Business>;
    deleteBusiness(businessid:string):Promise<any>;
    updateBusiness(business:Business):Promise<any>;
    getBusiness(businessid:string):Promise<Business>;
}