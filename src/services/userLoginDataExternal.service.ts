import { UserLoginDataExternalEntity } from "../entities/userLoginDataExternal.entity.js";
import db from "../utils/db.util.js";

async function getUserByExternalUID(uid: string): Promise<UserLoginDataExternalEntity | undefined> {
    return db<UserLoginDataExternalEntity>("user_login_data_external").where("external_uid", uid).first();
}

async function getUserByEmail(email: string): Promise<UserLoginDataExternalEntity | undefined> {
    return db<UserLoginDataExternalEntity>("user_login_data_external").where("email", email).first();
}
  
async function getUserById(user_id: number): Promise<UserLoginDataExternalEntity | undefined> {
    return db<UserLoginDataExternalEntity>("user_login_data_external").where("user_id", user_id).first();
}

// async function updateTokenByEmail(email: string, token: string): Promise<UserLoginDataExternalEntity | undefined> {
//     return db<UserLoginDataExternalEntity>("user_login_data_external").where("email", email).update("external_token",token,['user_id','external_uid','external_token','email']);
// }
  
export default {
    getUserByExternalUID,
    getUserByEmail,
    getUserById,
    // updateTokenByEmail,
}