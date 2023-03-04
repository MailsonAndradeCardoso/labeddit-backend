import express from "express"
import { UserBusiness } from "../business/UserBisuness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/UserDataBase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness (
        new UserDatabase(),
        new IdGenerator(),
        new HashManager(),
        new TokenManager()
    )
)

userRouter.post("/signup", userController.signup)
