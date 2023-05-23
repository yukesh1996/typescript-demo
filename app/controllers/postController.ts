import { NextFunction, Request, Response } from 'express';
import { PostService } from '../services/postService';
import * as resHandler from "../handler/responseHandler";

export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    save = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.postService.createPost(req.body)
            resHandler.sendSuccess(res);
        } catch (error) {
            resHandler.sendError(res, error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body: { title, description }, params: { postId } } = req
            const postDetails = {
                id: +postId,
                title,
                description,
                isActive: true
            }
            await this.postService.updatePost(postDetails);

            resHandler.sendSuccess(res)
        } catch (error) {
            resHandler.sendError(res, error)
        }
    }

    getPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params: { postId } } = req
            const postDetails = await this.postService.getPost({ id: postId })
            resHandler.sendSuccess(res, postDetails);
        } catch (error) {
            resHandler.sendError(res, error)
        }
    }

}
