import { UserDatabase } from "../database/UserDataBase"
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../dtos/UserDto"
import { BadRequestError } from "../errors/BadRequest"
import { NotFoundError } from "../errors/NotFoudError"
import { Users } from "../models/UserModels"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload } from "../types"

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
        
    ){}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { apelido, email, password } = input

        if (typeof apelido !== "string") {
            throw new BadRequestError("'name' deve ser uma string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser uma string")
}

    const id = this.idGenerator.generate()
    const hashedPassword = await this.hashManager.hash(password)
    const newUser =  new Users(
        id,
        apelido,
        email,
        hashedPassword,
        new Date().toISOString()
    )

    const userDB = newUser.toUserModelDB()

    await this.userDatabase.insert(userDB)

    const payload: TokenPayload = {
        id: newUser.getId(),
        apelido: newUser.getApelido()
    }

    const token = this.tokenManager.createToken(payload)

    const output: SignupOutputDTO = {
        token
    }

    return output
}
 
    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input

     if (typeof email !== "string") {
        throw new BadRequestError("'email' deve ser uma string")
    }

    if (typeof password !== "string") {
        throw new BadRequestError("'password' deve ser uma string")
}
    
    const userDB =  await this.userDatabase.findByEmail(email)

    if(!userDB){
        throw new NotFoundError("email invalido")
    }

    const passwordCorrect = await this.hashManager.compare(password, userDB.password)

    if(!passwordCorrect){
        throw new NotFoundError("password invalido")
}
    const users = new Users (
        userDB.id,
        userDB.apelido,
        userDB.email,
        userDB.password,
        userDB.created_at
    )

    const payload : TokenPayload = {
        id: users.getId(),
        apelido : users.getApelido(),
    }

    const token = this.tokenManager.createToken(payload)

    const output : LoginOutputDTO = {
        token
    }

    return output

}
}