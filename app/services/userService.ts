import models from '../models';

export class UserService {

    private userModel;

    constructor() {
        this.userModel = models.UserModel;
    }

    getUserByEmail(where?: any) {
        return this.userModel.findOne({
            where,
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

    createUser(userDetails: any) {
        return this.userModel.create(userDetails, {});
    }

}
