import { promises } from "dns";
import { RessetPasswordeDto } from "src/Dto/users/reste-password-dto";
import { UsersPresentDto } from "src/Dto/users/user-present-dto";
import { UsersCreateDto } from "src/Dto/users/users-crate-Dto";
import { UsersUpdateDto } from "src/Dto/users/users-update-dto";

export interface IUserServiceInterface {
    createUser(createDto: UsersCreateDto, file: any): Promise<object>
    getusers(email: string): Promise<object>
    getuserById(id: string): Promise<object>
    getAllusers(): Promise<any>
    deleteUser(id: string): Promise<any>
    updateUser(id: string, updateDto: UsersUpdateDto): Promise<any>
    ressetPassword(resetPasswordDto: RessetPasswordeDto): Promise<any>

}