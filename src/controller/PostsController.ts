import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { CreateCommentInput, CreatePostInput, GetPostsInput, LikeOrDislikeInput } from "../dtos/PostsDTO";
import { BaseError } from "../errors/BaseErrors";

export class PostsController {
    constructor (
        private postsBusiness: PostsBusiness
    ) {}
    
    public getPosts = async (req: Request, res: Response) => {
        try {
            const input : GetPostsInput = {
                token: req.headers.authorization
            }
            const output = await this.postsBusiness.getPosts(input)

            return output

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode)}
            else{
                res.status(500).send("erro inesperado")
            }
            }
        }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input : CreatePostInput = {
                token: req.headers.authorization,
                content: req.body.content
                }
            await this.postsBusiness.getPosts(input)
    
            res.status(201).send("Post criado com sucesso")
    
            } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)}
            else{
                res.status(500).send("erro inesperado")
        }
    }

}

public createComment =  async (req: Request, res: Response) =>{
    try {
        const input : CreateCommentInput = {
            id_post: req.body.id_post,
            comment: req.body.comment,
            token: req.headers.authorization as string,
}
       const output = await this.postsBusiness.getPosts(input)


        res.status(201).send(output)

        }catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)}
            else{
                res.status(500).send("erro inesperado")
        }
    }
}

public likeOrDislike = async (req:Request, res: Response)=>{
    try {

        const input : LikeOrDislikeInput = {
            idToLikeDislike: req.params.id,
            token: req.headers.authorization as string,
            like: req.body.like
}
    await this.postsBusiness.likeOrDislike(input)
    
    }catch (error) {
        console.log(error)

        if (error instanceof BaseError) {
            res.status(error.statusCode)}
        else{
            res.status(500).send("erro inesperado")
    }
}}}
