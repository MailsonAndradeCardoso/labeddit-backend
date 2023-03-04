import { UserDatabase } from "../database/UserDataBase"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/UserDto"
import { BadRequestError } from "../errors/BadRequest"
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
}}