import { AuthenticationDto } from "src/Dto/users/auth-dto";

export interface IAuthenticationServiseInterface {
    userLogin(authDto: AuthenticationDto): Promise<any>
}