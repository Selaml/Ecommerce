
import * as bcrypt from 'bcrypt';


export const hashPassword = async (password: string) => {
    const cheakPassword = await bcrypt.hash(password, 10);
    return cheakPassword;

}