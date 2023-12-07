import { getUserSpreadsheet } from "./get-user-spreadsheet.js";

export const findOne = async (user) => {
  const getUsers = await getUserSpreadsheet();
  
  return getUsers.filter(getUser => {
    if(getUser.email === user.email) return getUser;
  })  
}