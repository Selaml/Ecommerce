import { InjectRepository } from "@nestjs/typeorm";
import { CreateRolePermissionDto } from "src/Dto/create-role-permission/crate-role-permission-dto";
import { permissionsEntity } from "src/Entities/permission.entity";
import { rolePermissionEntity } from "src/Entities/rolePermissions.entity";
import { rolesEntity } from "src/Entities/role.entity";
import { RolePermissionInterface } from "src/Interfaces/role-permissionServiseInterface";
import { Repository } from "typeorm";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";


@Injectable()
export class RolePermissionServise implements RolePermissionInterface {
    constructor(@InjectRepository(rolePermissionEntity) private rolepermissionRepo: Repository<rolePermissionEntity>) { }

    async createRolePermission(createRolePermissionDto: CreateRolePermissionDto): Promise<any> {
        try {
            const assign = await this.rolepermissionRepo.create(
                createRolePermissionDto.permissionId.map(permissionId => ({
                    roleId: createRolePermissionDto.roleId,
                    permissionId: permissionId,
                }))
            );


            const assiged = await this.rolepermissionRepo.save(assign)

            return assiged;
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }


    }
    getRolePermission(): Promise<any> {
        const allrolemermission = this.rolepermissionRepo.find({ relations: ['role', "permission"] })
        return allrolemermission
    }
    getRolePermissionById(): Promise<any> {
        throw new Error("Method not implemented.");
    }


}