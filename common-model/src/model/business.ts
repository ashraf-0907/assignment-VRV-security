import { Teammember } from "./teammember";

export enum BusinessType{ 
    FOOD = "FOOD",
    RESTURANT = "RESTURANT",
    OTHERS = "OTHERS"
}


export class Business {
  businessName: string;
  businessType:BusinessType;
  lastActiveLicenseId:string;
  businessId:string;
  teammebers: Teammember [];

  constructor(
    businessName: string,
    businessId:string,
    businessType: BusinessType,
    lastActiveLicenseId:string,
    teammebers: Teammember []
  ) {

    this.businessType = businessType
    this.businessName = businessName
    this.lastActiveLicenseId = lastActiveLicenseId
    this.businessId = businessId
    this.teammebers = teammebers;

  }

  static getDefaultBusiness(): Business {
    return new Business("", "", BusinessType.OTHERS, "",[]);
  }

  static fromJSON(businessObject:any):Business{

    let business:Business = null

    if(businessObject){
      business = this.getDefaultBusiness();
        business.businessId = businessObject.businessId ?? "";
        business.businessName = businessObject.businessName ?? "";
        business.businessType = businessObject.businessObject;
        business.lastActiveLicenseId = businessObject.lastActiveLicenseId ?? "";
        businessObject.teammebers ? businessObject.teammebers.forEach(teammember => business.teammebers.push(Teammember.fromJSON(teammember))) : [];
    }

    return business;
  }

}
