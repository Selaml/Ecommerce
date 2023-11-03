import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { CreatePremissionDto } from "src/Dto/permission/create-permission-Dto";
import { PermissionService } from "src/Services/permission.service";


@Controller('permissions')
export class PermissionController {
    constructor(private permissionservice: PermissionService) { }
    @Post()
    async cretatePermission(@Body() createDto: CreatePremissionDto): Promise<any> {
        try {

            return await this.permissionservice.createPermission(createDto);


        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }

    @Get()
    async getALlPermissions(): Promise<any> {
        return await this.permissionservice.getPermission();

    }

}