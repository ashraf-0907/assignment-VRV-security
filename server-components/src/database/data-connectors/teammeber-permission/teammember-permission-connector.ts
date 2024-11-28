import {TeammemberPermission} from "common-model";
import { Role } from "common-model/model/teammember";

export interface TeammemberPermissionConnector{
    createTeammemberPermission(teammeberPermission:TeammemberPermission):Promise<TeammemberPermission>;
    getTeammemberPermission(businessid:string, role:Role):Promise<TeammemberPermission>;
    updateTeammemberPermission(teammeberPermission: TeammemberPermission):Promise<any>;
}