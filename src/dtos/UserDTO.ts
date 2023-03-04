
export interface SignupInputDTO {
    apelido: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO{
    token: string
}

export interface LoginInputDTO{
    email: unknown,
    senha: unknown
}

export interface LoginOutputDTO {
    token: string
}

export interface LogoutOutputDTO{
    token: string
}