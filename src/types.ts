export interface TokenPayload {
    id: string,
    apelido: string,
    
    }

export interface UserDB{
    id: string,
    apelido: string,
    email: string
    password: string,
    created_at: string
}

export interface UserModels{
    id: string,
    apelido: string,
    email: string
    password: string,
    created_at: string
}

export interface PostDB{
    id: string,
    user_id:string,
    content: string,
    comment: string,
    like: number,
    dislikes: number,
    created_at: string
}

export interface PostModel{
    id: string,
    userId:string,
    comment:string,
    content: string,
    like: number,
    dislikes: number,
    createdAt: string
}

export interface ComentsDB{
    id: string,
    user_id: string,
    post_id: string,
    comment: string,
    likes: number,
    dislikes: number,
    created_at: string
} 

export interface CommentsModels{
    id: string,
    userId: string,
    postId: string,
    comment: string,
    likes: number,
    dislikes: number,
    createdAt: string
}

export interface PostsLikesDilikesDB{
    user_id: string,
    post_id: string,
    like: number
}

export interface PostsLikesDilikesModels{
    userId: string,
    postId: string,
    like: number
}

export interface CommentsLikeDislikeDB{
    user_id: string,
    like: number
}

export interface CommentsLikeDislikeModels{
    userId: string,
    postId: string,
    like: number
}

export interface PostsCreatorDB{
    id: string,
    content: string,
    comment: string,
    likes: number, 
    dislikes: number,
    createdAt: string,
    user: {
        id: string,
        name: string
    }
}

export interface CommentsCreatorDB {
    id: string,
    post_id: string,
    comment: string,
    likes: number,
    dislikes: number,
    created_at: string,
    user: {
        user_id: string,
        name: string
    }
}