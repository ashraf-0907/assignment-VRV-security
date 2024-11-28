
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtToken } from "./environment";

export class User {
    name: string;
    userId: string;
    isVerified: boolean;
    businessIds: string[];
    email: string;
    phoneNumber: number;
    password: string;
    refreshToken: string;

    constructor(
        name: string,
        userId: string,
        email: string,
        phoneNumber: number,
        password: string,
        isVerified: boolean = false,
        refreshToken: string = "",
    ) {
        this.name = name;
        this.userId = userId;
        this.email = email;
        this.isVerified = isVerified;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.businessIds = [];
        this.refreshToken = refreshToken;
    }

    static getDefaultUser(): User {
        return new User("", "", "", 0, "");
    }

    static fromJSON(userObject: any): User {
        let user: User = null;
        if (userObject) {
            user = this.getDefaultUser();
            user.name = userObject.name ?? "";
            user.email = userObject.email ?? "";
            user.businessIds = userObject.allShopIds ?? [];
            user.isVerified = userObject.isVerified ?? false;
            user.password = userObject.password ?? "";
            user.userId = userObject.userId ?? "";
            user.phoneNumber = userObject.phoneNumber ?? 0;
            user.refreshToken = userObject.refreshToken ?? "";
        }

        return user;
    }

    async saveHasedPassword(password: string){
        this.password = await bcrypt.hash(password, 12);
        console.log(this.password);
    }

    async isPasswordCorrect(password: string) {
        return await bcrypt.compare(password, this.password);
    }

    generateAccessToken(): string {
        return jwt.sign(
            {
                id: this.userId,
            },
            jwtToken.ACCESS_SECRET, 
            {
                expiresIn: jwtToken.ACCESS_TOKEN_EXPIRY
            },
        );
    }

    setRefreshToken() {
        this.refreshToken = jwt.sign(
            {
                id: this.userId,
            },
            jwtToken.REFRESH_SECRET,
            {
                expiresIn: jwtToken.REFRESH_TOKEN_EXPIRY
            }
        )
    }

    isUserVerified(): boolean {
        return this.isVerified;
    }

    setUserVerified() {
        this.isVerified = true;
    }

}

