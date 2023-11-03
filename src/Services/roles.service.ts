import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleCreateDto } from "src/Dto/roles/roles-create-dto";
import { IRolesServiceInterface } from "src/Interfaces/RolesServiceInterface";
import { rolesEntity } from "src/Entities/role.entity";
import { Repository } from "typeorm";
@Injectable()
export class RoleService implements IRolesServiceInterface {
    constructor(@InjectRepository(rolesEntity) private rolesrepo: Repository<rolesEntity>) { }
    async createRoles(createDto: RoleCreateDto): Promise<any> {
        try {
            const role = await this.rolesrepo.create(createDto);
            const createdRole = await this.rolesrepo.save(role);
            return createdRole
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }
    async getRoles(id: string): Promise<any> {
        try {
            const role = await this.rolesrepo.find({ where: { id: id } })

            return {
                msg: "success",
                role: role,
                status: 200
            }

        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }

}