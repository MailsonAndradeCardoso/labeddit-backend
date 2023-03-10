import { PostDB, PostsCreatorDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDataBase";

export class PostsDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"

    public getAllPosts = async () => {
        const result = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .select()

        return result
    }

    public getPostCreator = async () => {
        const postDB = await this.getAllPosts()
        const userDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return{
            postDB,
            userDB,
        }
    }

    public insertPost =async (postDB: PostDB): Promise<void>  => {
        const result = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .insert(postDB)
    }

    public getPostById = async (id: string):Promise <PostDB | undefined> =>{
        const result :PostDB[] | undefined = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .select()
        .where({id:id})
        
        return result[0]
    }
    
    }