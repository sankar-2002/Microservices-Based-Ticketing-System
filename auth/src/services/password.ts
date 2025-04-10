import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    //compare the supplied password with the stored password
    //stored password is in the format of salt.hash
    static async compare (storedPassword: string, suppliedPassword: string) {
        const [salt, hash] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        return buf.toString('hex') === hash;
    }
    
    //hash the password with a random salt and return the salt and hash as a string
    //the salt and hash are separated by a dot
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex'); //generate a random salt of 8 bytes and convert it to hex string
        const buf = (await scryptAsync(password, salt, 64)) as Buffer; //hash the password with the salt and convert it to buffer
        return `${salt}.${buf.toString('hex')}`; //return the salt and hash as a string
    }
}