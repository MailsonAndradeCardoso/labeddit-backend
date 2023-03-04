import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBisuness";
import { SignupInputDTO } from "../dtos/UserDto";
import { BaseError } from "../errors/BaseErrors";

export class UserController {
    constructor(
    private userBusiness: UserBusiness
    ) {}

    public signup = async (req: Request, res: Response) => {
    try {
        const input: SignupInputDTO = {
        apelido: req.body.apelido,
        email: req.body.email,
        password: req.body.password
        }

        const output = await this.userBusiness.signup(input)

        res.status(201).send(output)
    
        } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
        } else {
        res.status(500).send("Erro inesperado")
        }
        }
    }}
