import { UserDB, UserModels, ComentsDB, CommentsModels } from "../types"

export class Comments{
    constructor(
    private id: string,
    private userId: string,
    private postId: string,
    private comment: string,
    private like: number,
    private dislike: number,
    private createdAt: string,
    ){}

    public getId(): string{
        return this.id
    }

    public setId(value: string): void{
         this.id = value
    }

    public getUserId(): string{
        return this.userId
    }

    public setUserId(value: string): void{
         this.userId = value
    }

    public getPostId(): string{
        return this.postId
    }

    public setPostId(value: string): void{
         this.postId = value
    }

    public getComment(): string{
        return this.comment
    }

    public setComment(value: string): void{
         this.comment = value
    }

    public getLike(): number{
        return this.like
    }

    public setLike(value: number): void{
         this.like = value
    }

    public getDislike(): number{
        return this. dislike
    }

    public setDislike (value: number): void{
         this. dislike = value
    }

    public getCreatedAt(): string{
        return this. createdAt
    }

    public setCreatedAt(value: string): void{
         this. createdAt = value
    }

    public toModelCommentsDB(): ComentsDB{
        return{
            id: this.id,
            user_id: this.userId,
            post_id: this.postId,
            comment: this.comment,
            likes: this.like,
            dislikes: this.dislike,
            created_at: this.createdAt,
        }}
        
    public toBusinessCommentsModels(): CommentsModels{
        return{
            id: this.id,
            userId: this.userId,
            postId: this.postId,
            comment: this.comment,
            likes: this.like,
            dislikes: this.dislike,
            createdAt: this.createdAt,
        }
    }
    }


