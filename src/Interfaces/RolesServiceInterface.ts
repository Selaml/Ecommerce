import { RoleCreateDto } from "src/Dto/roles/roles-create-dto";


export interface IRolesServiceInterface {
    createRoles(createDto: RoleCreateDto): Promise<any>
    getRoles(id: string): Promise<any>

}