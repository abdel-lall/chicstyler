import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// turn the callback base function "scrypt" to a promise base function
const asyncScrypt = promisify(scrypt);

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buff = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${buff.toString("hex")}.${salt}`;
  }
  static async compare(storedPassword: string, providedPassword: string) {
    const [password, salt] = storedPassword.split(".");
    const buff = (await asyncScrypt(providedPassword, salt, 64)) as Buffer;

    return password === buff.toString("hex");
  }
}
