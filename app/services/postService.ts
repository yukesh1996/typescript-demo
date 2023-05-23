import { IPost } from '../interfaces/IPost'
import models from '../models';
export class PostService {

    private PostModel;

    constructor() {
        this.PostModel = models.PostModel;
    }

    getPostByEmail(email: string) {
        return this.PostModel.findOne({
            where: { email },
        });
    }

    getPost(where?: any) : Promise<IPost>{
        return this.PostModel.findOne({
            where
        });
    }

    updatePost(PostDetails: IPost) {
        return this.PostModel.upsert(PostDetails, {});
    }

    createPost(PostDetails: IPost) {
        return this.PostModel.create(PostDetails, {});
    }

}
