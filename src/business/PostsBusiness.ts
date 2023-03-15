import { PostsDatabase } from "../database/PostsDatabase";
import { CreateCommentInput, CreatePostInput, GetPostOutput, GetPostsInput, LikeOrDislikeInput } from "../dtos/PostsDTO";
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
                creator(postDB.user_id),
                postDB.comments_post,
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
            name: payload.apelido},
            {
                id:"",
                post_id: "",
                comment: "",
                likes: 0,
                dislikes: 0,
                created_at: "",
                user: {
                    user_id:"",
                    name: ""
                }
            }
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
        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError ("'Token' inválido")
        }
        
        if(!filterPostById){
            throw new BadRequestError("post não encontrado");
            
        }

        const id = this.idGenerator.generate()
        const content = ''
        const likes = 0
        const dislikes = 0
        const created_at = new Date().toISOString()
        const user_id = payload.id

        const newComment = new Posts (
            id, 
            content,
            comment,
            likes,
            dislikes, 
            created_at,
            {id: user_id,
            name: payload.apelido},
            {id: '',
            post_id: '',
            comment: '',
            likes: 0,
            dislikes: 0,
            created_at: '',
                user: {
                    user_id: '',
                    name: ''
            }
            }
        )

        const updatePost = new Posts (
            filterPostById.id, 
            filterPostById.content,
            filterPostById.comment,
            filterPostById.like,
            filterPostById.dislikes,
            filterPostById.created_at,
            {id: user_id,
            name:payload.apelido},
            {id: '',
            post_id: '',
            comment: '',
            likes: 0,
            dislikes: 0,
            created_at: '',
                user: {
                    user_id: '',
                    name: ''
            }
            }
        )

        const newCommentDB = newComment.toCommentModelDB()
        await this.postsDatabase.creatComment(newCommentDB)
        const newUpdatePostDB =  updatePost.toModelsPostsDB()
        await this.postsDatabase.updatePost(newUpdatePostDB, filterPostById.id)
    }

    public likeOrDislike = async (input: LikeOrDislikeInput): Promise <void> =>{
        const {idToLikeDislike, token, like} = input
        const payload = this.tokenManager.getPayload(token)
            if(payload === null){
            throw new BadRequestError("token invalido")}

            if(token === undefined){
            throw new BadRequestError("token invalido")}

            if(like !== "boolean"){
            throw new BadRequestError("like invalido, deve ser boolean")
            
            }
        
        const postToLike = await this.postsDatabase.getPostById(idToLikeDislike)
        const commentToLike = await this.postsDatabase.getCommentById(idToLikeDislike)

        if(!postToLike){
            throw new NotFoundError("post inexistente")
        }

        if(!commentToLike){
            throw new NotFoundError("comment inexistente")
        }

        if(postToLike){
            let like = postToLike.like
            let dislikes = postToLike.dislikes

            if(like === 0){
                dislikes++
            }else if(like === 1){
                like++
            }else{
                throw new BadRequestError("é nada")
            }
        }

        const sendLike = new Posts (
            postToLike.id, 
            postToLike.content,
            postToLike.comment,
            postToLike.like,
            postToLike.dislikes,
            postToLike.created_at,
            {id: postToLike.id,
            name:payload.apelido},
            {id: '',
            post_id: '',
            comment: '',
            likes: 0,
            dislikes: 0,
            created_at: '',
                user: {
                    user_id: '',
                    name: ''
            }
            }


        )   
            
            const updateLike = {
                user_id: payload.id,
                post_id: idToLikeDislike,
                like: 1
            }

            const postLikeDB = sendLike.toModelsPostsDB()
            await this.postsDatabase.updatePost(postLikeDB, idToLikeDislike)
            await this.postsDatabase.likeDislike(updateLike)

            if(commentToLike){
                let like = commentToLike.like
                let dislikes = commentToLike.dislikes
        
                if(like === 0){
                    dislikes++
                }else if(like === 1){
                    like++
                }else{
                    throw new BadRequestError("é não")
                }
    }

    const commentLike = new Posts (
        idToLikeDislike, 
        commentToLike.content,
        commentToLike.comment,
        commentToLike.like,
        commentToLike.dislikes,
        commentToLike.created_at,
        {id: postToLike.id,
        name:payload.apelido},
        {id: '',
        post_id: '',
        comment: '',
        likes: 0,
        dislikes: 0,
        created_at: '',
            user: {
                user_id: '',
                name: ''
        }
        }
    )   

    const updateComment = {
        user_id: payload.id,
        comment_id: idToLikeDislike,
        like: 1
    }

    const commentLikeDB = commentLike.toModelsPostsDB()
    await this.postsDatabase.updateComments(commentLikeDB, idToLikeDislike)
    await this.postsDatabase.updateLikeOrDislikeComment(updateComment)
   
    }}
