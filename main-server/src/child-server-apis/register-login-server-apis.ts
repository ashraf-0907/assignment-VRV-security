import { User, ApiResponse, ServerMessage } from "common-model";
import { UserDataService } from "server-components";

export class RegisterLoginServerApis {


    userDataService: UserDataService
    constructor(
        userDataService: UserDataService,
    ) {
        this.userDataService = userDataService;
    }

    async registerUser(requestid: string, username: string, password: string, email: string, phoneNumber: string): Promise<ApiResponse> {
        let user: User = await this.userDataService.getUserByEmail(requestid, email);
        console.log("789",user);
        let response: ApiResponse = null;

        if (!user) {
            user = User.getDefaultUser();
            user.name = username;
            user.email = email;
            user.phoneNumber = Number(phoneNumber);
            await user.saveHasedPassword(password);
            user.setRefreshToken();
            console.log(user);
            try {
                const res = await this.userDataService.createUser(requestid, user);

                response = new ApiResponse(200, ServerMessage.SUCCESS, res);
            } catch (error) {
                response = new ApiResponse(500, ServerMessage.INTERNAL_SERVER_ERROR, null);
            }
        } else {
            response = new ApiResponse(401, ServerMessage.FAILED, "User Already Exist");
        }

        console.log(response);

        return response;
    }

    async loginUser(requestid: string, email: string, password: string): Promise<ApiResponse> {
        const user: User = await this.userDataService.getUserByEmail(requestid, email);
        let response: ApiResponse = null;
        if (user) {
            if (await user.isPasswordCorrect(password)) {
                const accessToken = user.generateAccessToken();
                response = new ApiResponse(200, ServerMessage.SUCCESS, accessToken);

            }else {
                response = new ApiResponse(401, ServerMessage.FAILED, "Wrong Credintials");
            }
        } else {
            response = new ApiResponse(401, ServerMessage.FAILED, "User does not Exist");
        }
        return response;
    }
}