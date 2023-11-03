import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePremissionDto } from "src/Dto/permission/create-permission-Dto";
import { IPermissionService } from "src/Interfaces/PermissionServiceInterface";
import { permissionsEntity } from "src/Entities/permission.entity";
import { Repository } from "typeorm";
@Injectable()
export class PermissionService implements IPermissionService {
    constructor(@InjectRepository(permissionsEntity) private permissionRepo: Repository<permissionsEntity>) { }
    async createPermission(createDto: CreatePremissionDto): Promise<any> {
        try {

            const permission = this.permissionRepo.create(createDto)
            const createdPermission = await this.permissionRepo.save(permission)

            return createdPermission;
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }
    getPermission(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}