import { compare, hash } from 'bcrypt';
import { IUser } from '../interfaces/IUser'
import models from '../models';
export class UserService {

    private userModel;

    constructor() {
        this.userModel = models.UserModel;
    }

    createHash = (plainText: string) => {
        return hash(plainText, 10);
    }

    compareHash = (plainText: string, hashedStr: string) => {
        return compare(plainText, hashedStr);
    }

    getUserByEmail(email: string) {
        return this.userModel.findOne({
            where: { email },
        });
    }

    getUser(where?: any) {
        return this.userModel.findOne({
            where
        });
    }

    updateUser(userDetails: any) {
        return this.userModel.upsert(userDetails, {});
    }

    createUser(userDetails: IUser) {
        return this.userModel.create(userDetails, {});
    }

}
