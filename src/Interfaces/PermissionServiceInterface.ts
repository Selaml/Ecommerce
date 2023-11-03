import { Interface } from "readline"
import { CreatePremissionDto } from "src/Dto/permission/create-permission-Dto"

export interface IPermissionService {
    createPermission(createDto: CreatePremissionDto): Promise<any>
    getPermission(): Promise<any>


}