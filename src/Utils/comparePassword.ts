import * as bcrypt from 'bcrypt';

import * as jwt from 'jsonwebtoken'
import { async } from 'rxjs';
export const ComparePassword = async (dtoPassword: string, hashedPassword: string) => {
    const cheakPassword = bcrypt.compareSync(dtoPassword, hashedPassword)
    return cheakPassword;


}

export const generrateToken = async (id: string, secret: string) => {
    const payload = { id };
    const cheakPassword = jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRES })
    return cheakPassword;

}


