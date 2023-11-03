import { Injectable } from "@nestjs/common";
import { usersEntity } from "src/Entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class userrepository extends Repository<usersEntity>{


}