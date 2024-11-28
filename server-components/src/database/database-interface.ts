import { BusinessDataService, TeammemberPermissionDataService } from "./data-connectors";
import { UserDataService } from "./data-connectors/user";

export interface DatabaseInterface {
    init(): Promise<void>;
    cleanUp(): Promise<void>;
    getUserDataService():UserDataService;
    getBusinessDataService():BusinessDataService;
    getTeammemberPermissionDataService():TeammemberPermissionDataService;
}