import { ComentsDB, CommentsCreatorDB, CommentsModels, PostDB, PostModel } from "../types"
import { LikeOrDislikeInput } from "../dtos/PostsDTO"

export class Posts {
    constructor (
    private id: string,
    private content: string,
    private comment: string,
    private likes: number, 
    private dislikes: number,
    private createdAt: string,
    private user: {
        id: string,
        name: string
    },
    private comment_post : CommentsCreatorDB
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getComment(): string {
        return this.comment
    }

    public setComment(value: string): void {
        this.comment = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public addLike() {
        this.likes += 1
    }

    public removeLike() {
        this.likes -= 1
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }
public addDislike() {
        this.dislikes += 1
    }

    public removeDislike() {
        this.dislikes -= 1
    }


    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUser():{
        id: string,
        name: string,
    }{
        return this.user
    }

    public setUser(value :{
        id: string,
        name: string,
    }){
        this.user = value
    }

    public toModelsPostsDB(): PostDB {
        return {
        id: this.id,
        user_id: this.user.id,
        content: this.content,
        comment: this.comment,
        like: this.likes,
        dislikes: this.dislikes,
        created_at: this.createdAt
        } 
    }

    public toBusinessPostsModels(): PostModel {
        return {
        id: this.id,
        userId: this.user.id,
        content: this.content,
        comment: this.comment,
        like: this.likes,
        dislikes: this.dislikes,
        createdAt: this.createdAt
        } 
    }

    public toCommentModelDB(): ComentsDB{
        return {
            id: this.id,
            user_id: this.user.id,
            post_id: this.comment_post.post_id,
            comment: this.comment,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt        
        }
    }
    public ToBusinessCommentsModels() :  CommentsModels{
        return{
        id: this.id,
        userId: this.user.id,
        postId: this.comment_post.post_id,
        comment: this.comment,
        likes: this.likes,
        dislikes: this.dislikes,
        createdAt: this.createdAt
        }
    }
}