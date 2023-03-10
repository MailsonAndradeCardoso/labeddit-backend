import { PostsDatabase } from "../database/PostsDatabase";
import { CreateCommentInput, CreatePostInput, GetPostOutput, GetPostsInput } from "../dtos/PostsDTO";
import { BadRequestError } from "../errors/BadRequest";
import { NotFoundError } from "../errors/NotFoudError";
import { Posts } from "../models/PostsModels";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class PostsBusiness{
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
        
    ){}

    public getPosts = async (input: GetPostsInput): Promise<GetPostOutput> => {
        const { token } = input
    
         if (!token) {
            throw new NotFoundError("necessita token")
        }
        
        const payload = this.tokenManager.getPayload(token)
     
    if(payload === null){
        throw new BadRequestError("token invalido");
        
    }

    const { postDB, userDB} = await this.postsDatabase.getPostCreator() 

        function creator(userId: string) {
            const user = userDB.find((userDB) => {
                return userDB.id === userId
            })

            return {
                id: user.id,
                name: user.name
            }
        }

        const posts = postDB.map((postDB) => {
            const post = new Posts (
                postDB.id,
                postDB.content,
                postDB.comment,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                creator(postDB.user_id)
            )

            return post.toBusinessPostsModels()
        })
    
        const output : GetPostOutput = posts

        return output
}
    public createPost = async (input: CreatePostInput): Promise <void> =>{
        const {token, content} =  input
        
        if(token === undefined){
            throw new BadRequestError("token invalido");
            
        }

        if(content === null){
            throw new BadRequestError("token invalido");
            
        }

        if(typeof content !== "string"){
            throw new BadRequestError("deve ser string");
            
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token invalido")
        }

        const id = this.idGenerator.generate()
        const created_at = new Date().toISOString()
        const user_id = payload.id

        const newPost = new Posts(
            id,
            content,
            "",
            0,
            0,
            created_at,
            {id:  user_id,
            name: payload.apelido}
        )

        const postsDB = newPost.toModelsPostsDB()

        await this.postsDatabase.insertPost(postsDB)
    }

    public createComment = async (input : CreateCommentInput): Promise<void> =>{
        const {id_post , comment, token } = input

        if(id_post !== "string"){
            throw new BadRequestError("token invalido");
        }

        if(comment === "string"){
            throw new BadRequestError("token invalido");
            
        }

        if(token === undefined){
            throw new BadRequestError("token invalido");
            
        }

        const filterPostById = await this.postsDatabase.getPostById(id_post)

        if(!filterPostById){
            throw new BadRequestError("post não encontrado");
            
        }

        
    }
}