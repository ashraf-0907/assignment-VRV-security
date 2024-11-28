import { Business } from "common-model";
import { MongodbConnection } from "../../mongodb-connection";
import { MongodbBusinessConnector } from "../mongodb/mongodb-business-connector";
import { BusinessConnector } from "./business-connector";

export class BusinessDataService {

    businessConnector: BusinessConnector;

    constructor(mongodbConnection:MongodbConnection){
        this.businessConnector = new MongodbBusinessConnector(mongodbConnection);
    }

    async createBusiness(requestid:string, business: Business):Promise<Business>{
        let result:Business = null;
        if(business){
            try {
                result = await this.businessConnector.createBusiness(business);
            } catch (error) {
                throw error;
            }
        }
        return result;
    }

    async deleteBusiness(requestid:string, businessid:string){
        if(businessid){
            try {
                await this.businessConnector.deleteBusiness(businessid);
            } catch (error) {
                throw error;
            }
        }
    }

    async getBusiness(requestid:string, businessid: string){
        let result:Business = null;
        if(businessid){
            try {
                result = await this.businessConnector.getBusiness(businessid);
            } catch (error) {
                throw error;
            }
        }
        return result ;
    }

    async updateBusiness(requestid:string, business: Business){
        try {
            await this.businessConnector.updateBusiness(business);
        } catch (error) {
            throw error;
        }
    }
}