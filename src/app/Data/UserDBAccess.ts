import Nedb from "nedb";
import { User } from "../Models/UserModel";

export class UserDBAccess {
  private nedb: Nedb;

  constructor(nedb = new Nedb("databases/Users.db")) {
    this.nedb = nedb;
    this.nedb.loadDatabase();
  }

  public async putUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(user, (err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  public async getUserByName(name: string): Promise<User[]> {
    const regEx = new RegExp(name);
    return new Promise((resolve, reject) => {
      this.nedb.find({ name: regEx }, (err: Error, docs: any[]) => {
        if (err) reject(err);
        else resolve(docs);
      });
    });
  }
}
