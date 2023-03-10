import { PostModel } from "../types"


export interface GetPostsInput{
    token: string | undefined
}

export type GetPostOutput = PostModel[]

export interface CreatePostInput {
    token: string | undefined,
    content: unknown
}

export interface LikeOrDislikeInput{
    idToLikeDislike: string,
    token: string,
    like: unknown
}

export interface CreateCommentInput{
    id_post: string,
    comment: string,
    token: string
}
