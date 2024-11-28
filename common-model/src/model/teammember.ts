export enum Role {
    ADMIN = "ADMIN",
    DILEVERY_BOY = "DILEVERY_BOY",
    COOK = "COOK",
}

export class Teammember{
    teammemberid:string;
    role: Role;

    constructor(teammemberid:string,role: Role ){
        this.teammemberid = teammemberid;
        this.role = role;
    }

    static getDefaultTeammember():Teammember{
        return new Teammember("",Role.ADMIN);
    }

    static fromJSON(object: any):Teammember{
        let teammeber:Teammember = null;
        if(object){
            teammeber = this.getDefaultTeammember();
            teammeber.teammemberid = object.teammemberid ?? "";
            teammeber.role = object.role ?? Role.ADMIN;
        }
        return teammeber;
    }
}