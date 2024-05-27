import { compare, hash } from 'bcrypt';

export class HashingUtil {
  static async hash(stringToHash: string, salt: number = 10) {
    return await hash(stringToHash, salt);
  }

  static async compare(stringToCompare, stringHashed) {
    return compare(stringToCompare, stringHashed);
  }
}
