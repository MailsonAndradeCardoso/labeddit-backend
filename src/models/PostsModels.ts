import { PostDB, PostModel } from "../types"

 

export class Posts{
    constructor(
    private id: string,
    private userId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    ){}

    public getId(): string{
        return this.id
    }

    public setId(value: string): void{
         this.id = value
    }
    
    public getUser_id(): string{
        return this.user_id
    }

    public setUser_id(value: string): void{
         this.user_id= value
    }

    public getContent(): string{
        return this.content
    }

    public setContent(value: string): void{
         this.content= value
    }

    public getLikes(): number{
        return this.likes
    }

    public setLikes(value: number): void{
         this.likes= value
    }

    public getDisLikes(): number{
        return this.dislikes
    }

    public setDisLikes(value: number): void{
         this.dislikes= value
    }

    public getCreateAt(): string{
        return this.createdAt
    }

    public setCreatedAt(value: string): void{
         this.createdAt= value
    }

    public toModelPostDB(): PostDB{
        return{
            id: this.id,
            user_id: this.userId,
            content: this.content,
            like: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt
        }
    }

    public toBusinessPostsModels(): PostModel{
        return{
            id: this.id,
            userId: this.userId,
            content: this.content,
            like: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt
        }
    }

}
