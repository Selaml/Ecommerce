import { CreateRolePermissionDto } from "src/Dto/create-role-permission/crate-role-permission-dto";




export interface RolePermissionInterface {
    createRolePermission(createRolePermissionDto: CreateRolePermissionDto): Promise<any>
    getRolePermission(): Promise<any>
    getRolePermissionById(): Promise<any>

}