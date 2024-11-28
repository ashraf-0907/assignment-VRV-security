import { Business, DBCollectionMapper } from "common-model";
import { BusinessConnector } from "../business/business-connector";
import { MongodbConnector } from "./mongodb-connector";
import { ObjectId } from "mongodb";

export class MongodbBusinessConnector extends MongodbConnector implements BusinessConnector {

    async createBusiness(business: Business): Promise<Business> {
        business.businessId = (new ObjectId).toHexString();
        await this.createDocument(DBCollectionMapper.BUSINESSES, { _id: business.businessId, business });
        return business;
    }
    async deleteBusiness(businessid: string) {
        await this.deleteDocument(DBCollectionMapper.BUSINESSES, { "business.businessId": businessid });
    }
    async getBusiness(businessid: string): Promise<Business> {
        const response = await this.getDocument(DBCollectionMapper.BUSINESSES, { "business.businessId": businessid });
        return Business.fromJSON(response.business);
    }

    async updateBusiness(business: Business): Promise<any> {
        return await this.updateOne(DBCollectionMapper.BUSINESSES, { "business.businessId": business.businessId }, {
            "$set":{
                "business": business
            }
        });
    }

}