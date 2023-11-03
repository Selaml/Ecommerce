import { Injectable, NestMiddleware, HttpException, HttpStatus } from "@nestjs/common";
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { UsersService } from "src/Services/user.service";

@Injectable()
export class Authentication implements NestMiddleware {
    constructor(private readonly usersService: UsersService) { }

    async use(req: any, res: any, next: NextFunction) {
        try {
            const header = (req.headers as any).authorization;
            if (header && header.split(" ")[0] === "Bearer") {
                const token = header.split(" ")[1];
                if (!token) {
                    throw new HttpException("Please Login First", HttpStatus.UNAUTHORIZED);
                }
                const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
                const id = (verifyToken as any).id;
                const user = await this.usersService.getuserById(id);
                req.user = user;
                next();
            } else {
                throw new HttpException("Please Login First", HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return next(new HttpException(error.message, HttpStatus.UNAUTHORIZED));
        }
    }
}
