import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "src/Controllers/users.controller";
import { rolesEntity } from "src/Entities/role.entity";
import { usersEntity } from "src/Entities/users.entity";
import { MulterConfigService } from "src/Middleware/uploadFile";
import { userrepository } from "src/Repository/users.repository";
import { AuthenticationServise } from "src/Services/authentication.servise";
import { UsersService } from "src/Services/user.service";


@Module({
    imports: [TypeOrmModule.forFeature([usersEntity, rolesEntity])],
    controllers: [UsersController],
    providers: [UsersService, userrepository, AuthenticationServise, MulterConfigService],
    exports: [UsersService, MulterConfigService]
})
export class UsersModule { }
