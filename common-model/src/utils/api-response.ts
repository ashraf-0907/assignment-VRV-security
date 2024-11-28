export enum ServerMessage {
    NOT_AUTHORIZED = "Not Authorized",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    SUCCESS = "Success",
    PARAMETER_MISSING = "Parameter Missing",
    FAILED = "Failed",
}


export class ApiResponse {
    status: number;
    message: ServerMessage | string;
    data: any | null;

    constructor (status: number, message: ServerMessage | string, data: any | null = null){
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static getDefaultApiResponse(){
        return new ApiResponse(0,"");
    }

    static fromJSON(responseObject: any):ApiResponse{
        let apiResponse : ApiResponse = null;
        if(responseObject){
            apiResponse = this.getDefaultApiResponse();
            apiResponse.status = responseObject.status ?? 0;
            apiResponse.message = responseObject.message ?? "";
            apiResponse.data = responseObject.data ?? null;
        }
        return apiResponse;
    }

}