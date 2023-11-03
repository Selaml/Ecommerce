import { Injectable, CanActivate, ExecutionContext, SetMetadata, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getMetadataStorage } from 'class-validator';
import { request } from 'http';
import { permissionsEntity } from 'src/Entities/permission.entity';


@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const permission = this.reflector.get<string[]>(
            'permission',
            context.getHandler(),
        );

        const request = context.switchToHttp().getRequest();

        const user = request.user



        if (user.role.permissions.length > 0) {
            const checkPermission = user.role.permissions.some((item) => {
                return item.slug === permission.toString();
            });


            if (checkPermission) {



                return true
            }
            return false

        }
        else {
            return false
        }


        /*   if (!roles) {
              return true;
          }
          const request = context.switchToHttp().getRequest();
          const user = request.user;
          return matchRoles(roles, user.roles); */
        return true
    }
} 