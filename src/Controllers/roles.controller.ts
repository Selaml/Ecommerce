import { Body, Post, Controller, Get, Param } from "@nestjs/common";
import { RoleCreateDto } from "src/Dto/roles/roles-create-dto"
import { RoleService } from "src/Services/roles.service";

@Controller('roles')
export class RolesController {
    constructor(private roleService: RoleService) { }



    @Post()
    async createRoles(@Body() cretaeDto: RoleCreateDto): Promise<any> {
        return await this.roleService.createRoles(cretaeDto);

    }

    @Get(':id')
    async getRolesById(@Param('id') id: string): Promise<any> {
        return await this.roleService.getRoles(id)
    }

}