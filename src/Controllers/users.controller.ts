import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

//import { AuthorizationGuard } from 'Gurad/AuthorizationGuard';
import { promises } from 'dns';
import { diskStorage } from 'multer';
import * as path from 'path';
import { AuthenticationDto } from 'src/Dto/users/auth-dto';
import { RessetPasswordeDto } from 'src/Dto/users/reste-password-dto';

import { UsersPresentDto } from 'src/Dto/users/user-present-dto';
import { UsersCreateDto } from 'src/Dto/users/users-crate-Dto';
import { UsersUpdateDto } from 'src/Dto/users/users-update-dto';
import { AuthenticationServise } from 'src/Services/authentication.servise';
import { UsersService } from 'src/Services/user.service';



@Controller('users')

export class UsersController {
    constructor(private readonly userService: UsersService,
        private authservice: AuthenticationServise) { }

    @Post()

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {


                cb(null, `${file.originalname}`)
                console.log(file.originalname, "lll")
            }
        })
    }))

    async createUsers(@Body() createDto: UsersCreateDto, @UploadedFile() file): Promise<object> {

        return await this.userService.createUser(createDto, file)
    }


    @Post("login")

    async login(@Body() authDto: AuthenticationDto): Promise<object> {
        try {


            return await this.userService.userLogin(authDto)
        } catch (error) {
            return new HttpException("invalid input", HttpStatus.BAD_REQUEST)

        }
    }


    @Get(':id')



    async getUserById(@Param('id') id: string): Promise<any> {
        try {

            console.log(id, "id")
            return await this.userService.getuserById(id);
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }


    @Get('fileuploads/:fileName')
    display(@Param('fileName') fileName: string, @Res() res) {
        res.sendFile(fileName, { root: './uploads' })
    }



    @Get()

    async getAllUser(@Req() request: Request): Promise<any> {
        console.log(request.body, "selam nahahah")


        return await this.userService.getAllusers()
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<any> {


        return await this.userService.deleteUser(id)
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, updateDto: UsersUpdateDto): Promise<any> {


        return await this.userService.updateUser(id, updateDto)
    }

    @Post("resset")
    async resetPassword(ressetPasswordeDto: RessetPasswordeDto): Promise<any> {


        return await this.userService.ressetPassword(ressetPasswordeDto)
    }


}
