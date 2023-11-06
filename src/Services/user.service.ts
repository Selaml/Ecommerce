import { Catch, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPresentDto } from 'src/Dto/users/user-present-dto';
import { UsersCreateDto } from 'src/Dto/users/users-crate-Dto';
import { IUserServiceInterface } from 'src/Interfaces/UserServiceInterface';
import { usersEntity } from 'src/Entities/users.entity';
import { userrepository } from 'src/Repository/users.repository';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { STATUS_CODES } from 'http';
import { AuthenticationDto } from 'src/Dto/users/auth-dto';
import * as jwt from 'jsonwebtoken'
import { ComparePassword, generrateToken } from 'src/Utils/comparePassword';
import { request } from 'express';
import { rolesEntity } from 'src/Entities/role.entity';
import Item from 'antd/es/list/Item';
import { error } from 'console';
import { IMG_URL } from 'src/const/common';
import { hashPassword } from 'src/Utils/hashPassword';
import { UsersUpdateDto } from 'src/Dto/users/users-update-dto';
import { RessetPasswordeDto } from 'src/Dto/users/reste-password-dto';
import { generateVerivicationcode } from 'src/Utils/genereteverificationcode';
import { emailsend } from 'src/Utils/sendemail';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationCodeDto } from 'src/Dto/users/verify-verificationcode-dto';
import { NewPasswordDto } from 'src/Dto/users/user-newpassword-dto';

@Injectable()
export class UsersService implements IUserServiceInterface {
    constructor(@InjectRepository(usersEntity) private readonly usersrepo: userrepository,
        @InjectRepository(rolesEntity) private readonly roleRepo: Repository<rolesEntity>,
        private readonly mailerService: MailerService,) { }



    async newPassword(id: string, newPasswordDto: NewPasswordDto): Promise<any> {
        try {
            const user = await this.getuserById(id)
            if (user) {
                const checkPassword = newPasswordDto.newPassword == newPasswordDto.ConfirmPasword
                if (checkPassword) {
                    const password = await hashPassword(newPasswordDto.newPassword)
                    const createUser = await this.usersrepo.update(id, {
                        password: password

                    })
                    return user

                }
                return await new HttpException("new password and confirm password dosent match", HttpStatus.BAD_REQUEST)
            }
            else {
                return await new HttpException("user not found", HttpStatus.BAD_REQUEST)

            }

        } catch (error) {
            return await new HttpException("something went wrong", HttpStatus.BAD_REQUEST)

        }
    }




    async verifyCode(id: string, verificationCodeDto: VerificationCodeDto): Promise<any> {
        try {
            const user = await this.getuserById(id)
            if ((user as any).user.verificationCode === verificationCodeDto.verification) {
                return {
                    status: 200,
                    msg: "succesfull",
                    user: user
                }

            }
            else {

                return await new HttpException("wrong verification code", HttpStatus.BAD_REQUEST)
            }

        } catch (error) {
            return await new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }


    async ressetPassword(resetPasswordDto: RessetPasswordeDto): Promise<any> {
        try {
            const userExists = await this.getusers(resetPasswordDto.email)
            if (userExists) {
                const ressetToken = await generrateToken(userExists.id, process.env.JWT_SECRET)
                const verificationCode = await generateVerivicationcode()
                console.log(userExists, "ll")
                const id = userExists.id
                //  console.log(userExists., "ff")
                const updateUser = await this.usersrepo.update(userExists.user.id, {

                    passwordChangeToken: ressetToken,
                    verificationCode: verificationCode,
                    tokenExpirationTime: "2h",
                    passwordChanged: true,


                })

                console.log(updateUser, "up")


                const sendemails = await emailsend.sendEmail(this.mailerService, process.env.SYSTEM_EMAIL,
                    userExists.user.email,
                    "[IE Networks Solutions] Password Reset E-mail",
                    `<h2>Hello ${userExists.user.name} </h2>
      <p> You're receiving this e-mail because you or someone else has requested a password reset for your user account.</p>
      <h4>Click the link below to reset your password:</h4>
    <a href="http://172.16.32.114:5173/verification/${userExists.user.id}">Click here to change your default password</a>
    <p> Your verification code is <strong> ${userExists.user.verificationCode}</strong></p>
       
       <p>If you did not request a password reset you can safely ignore this email.</p?
    <p>Thank you!</p>`,

                );

                if (sendemails) {

                    return "email is sent "

                }
                return new HttpException("somehting went wrong", HttpStatus.BAD_REQUEST)

            }






        } catch (error) {
            return await new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }
    async getAllusers(): Promise<any> {
        try {

            const user = await this.usersrepo.find({ where: { isDeleted: false }, relations: ['role', "role.permissions"] })

            return {
                message: "Success",
                status: 200,
                user: user,


            }
        }
        catch (error) {
            return new HttpException("user not found", HttpStatus.NOT_FOUND)
        }
    }
    async getuserById(id: string): Promise<object> {
        try {
            const user = await this.usersrepo.findOne({
                where: { id: id, isDeleted: false }, relations: ['role', 'role.permissions']
            })
            if (!user) {
                return new HttpException("user not found", HttpStatus.NOT_FOUND)
            }
            return {
                message: "Success",
                status: 200,
                user: user,


            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }


    }

    async createUser(createDto: UsersCreateDto, file: any): Promise<object> {
        try {

            const hashedPassword = await hashPassword(createDto.password);
            const userExists = await this.getusers(createDto.email);


            if (userExists) {
                return new HttpException("email already exists", HttpStatus.FOUND)


            }
            else {
                console.log(file, "file")

                const imagePath = file.path.replace(/\\/g, '/')
                const userRole = await this.roleRepo.findOne({ where: { roleName: "user" } })


                const user = this.usersrepo.create({
                    name: createDto.name,
                    email: createDto.email,
                    password: hashedPassword,
                    roleId: userRole.id,
                    proPic: `${IMG_URL}${imagePath}`


                });
                const createdUser = await this.usersrepo.save(user);

                return {
                    message: "Successfuly created",
                    status: 201,
                    user: createdUser,


                }
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }


    }

    async getusers(email: string): Promise<any> {
        try {
            const users = request.body

            const user = await this.usersrepo.findOne({
                where: { email: email, isDeleted: false }
            })
            if (!user) {

                return user
            }

            return {
                message: "Success",
                status: 200,
                user: user,


            }
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }




    async userLogin(authDto: AuthenticationDto): Promise<any> {
        try {

            const user = await this.getusers(authDto.email)
            console.log(user, "ll")
            if (!user) {
                return new HttpException("email doesnt exist", HttpStatus.BAD_REQUEST)


            }
            else {

                const cheakPassword = await ComparePassword(authDto.password, user.user.password)



                if (cheakPassword) {
                    const token = await generrateToken(user.user.id, process.env.JWT_SECRET)
                    return {
                        message: "Successfuly loggedIn",
                        user: user,
                        token: token

                    }



                }
                else {
                    return new HttpException("incorrect Password", HttpStatus.BAD_REQUEST)


                }
            }

        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async deleteUser(id: string): Promise<any> {

        try {
            const deletedUser = await this.usersrepo.update(id, { isDeleted: true })
            return {
                msg: "successfull",
                status: 200
            }




        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }

    }



    async updateUser(id: string, updateDto: UsersUpdateDto): Promise<any> {
        try {

            const hashedPassword = await hashPassword(updateDto.password);


            const updatedUser = this.usersrepo.update(id, {
                name: updateDto.name,
                email: updateDto.email,
                password: hashedPassword,
                roleId: updateDto.roleId


            })
            return {
                msg: "succsesfuly updated",
                status: 200,
                user: updatedUser
            }

        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }





}



