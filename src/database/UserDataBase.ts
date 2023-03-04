import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public insert = async (userDB: UserDB): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }
}