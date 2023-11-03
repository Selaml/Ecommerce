import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { AuthenticationDto } from "src/Dto/users/auth-dto";

import { UsersService } from "./user.service";

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { IAuthenticationServiseInterface } from "src/Interfaces/authenticationServise.Interface";
@Injectable()
export class
    AuthenticationServise implements IAuthenticationServiseInterface {
    constructor(private usersService: UsersService) { }

    async userLogin(authDto: AuthenticationDto): Promise<any> {
        try {
            console.log(authDto.email, "klklkl");
            const user = await this.usersService.getusers(authDto.email)
            if (user) {
                const cheakPassword = bcrypt.compareSync(authDto.password, user.password)
                if (cheakPassword) {
                    const token = jwt.sign(user.id, "1234")
                    return {
                        user: user,
                        token: token
                    }



                }
            }
            else {
                return new HttpException("unauthorized user", HttpStatus.UNAUTHORIZED)
            }

        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }


}