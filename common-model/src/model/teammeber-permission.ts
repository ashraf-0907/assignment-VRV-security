import { Role } from "./teammember";

export class TeammemberPermission {
    canAddTeammember: boolean;
    canAddProduct: boolean;
    canEditBills: boolean;
    canEditProductInfo: boolean;
    canEditTeammeberPermissin: boolean;
    teammemberType: Role;
    businessid: string;

    constructor(
        canAddTeammember: boolean,
        canAddProduct: boolean,
        canEditBills: boolean,
        canEditProductInfo: boolean,
        canEditTeammeberPermissin: boolean,
        role: Role,
        enterpriseid: string
    ) {
        this.canAddProduct = canAddProduct;
        this.canAddTeammember = canAddTeammember;
        this.canEditBills = canEditBills;
        this.canEditProductInfo = canEditProductInfo;
        this.canEditTeammeberPermissin = canEditTeammeberPermissin;
        this.businessid = enterpriseid;
        this.teammemberType = role;
    }

    static getDefaultTeammemberPermission(role: Role): TeammemberPermission {
        let teammeberPermission: TeammemberPermission = null;
        switch (role) {
            case Role.ADMIN:
                teammeberPermission = new TeammemberPermission(true, true, true, true, true, Role.ADMIN,"");
                break;
            case Role.DILEVERY_BOY:
                teammeberPermission = new TeammemberPermission(false, false, true, false, false, Role.DILEVERY_BOY,"");
                break;
            case Role.COOK:
                teammeberPermission = new TeammemberPermission(false, true, false, true, false, Role.COOK,"");
                break;
        }

        return teammeberPermission;
    }

    static fromJSON(permissionObject: any): TeammemberPermission {
        let teammemberPermission: TeammemberPermission = null;
        if (permissionObject) {
            teammemberPermission = this.getDefaultTeammemberPermission(Role.ADMIN);
            teammemberPermission.canAddProduct = permissionObject.canAddProduct ?? false;
            teammemberPermission.canAddTeammember = permissionObject.canAddTeammember ?? false;
            teammemberPermission.canEditBills = permissionObject.canEditBills ?? false;
            teammemberPermission.canEditProductInfo = permissionObject.canEditProductInfo ?? false;
            teammemberPermission.canEditTeammeberPermissin = permissionObject.canEditTeammeberPermissin ?? false;
            teammemberPermission.businessid = permissionObject.businessid ?? "";
            teammemberPermission.teammemberType = permissionObject.teammemberType ?? Role.DILEVERY_BOY;
        }
        return teammemberPermission;
    }
}
