import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

  export const getUserSpreadsheet = async () => {
    const docGoogle = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, serviceAccountAuth);
    const usersFromSpreadsheet = [];
    await docGoogle.loadInfo()
    console.log(docGoogle.title);
    
    const sheet = docGoogle.sheetsByIndex[0];
    console.log(sheet.title);
    
    const rows = await sheet.getRows();
  
    rows.forEach(row => {
      usersFromSpreadsheet.push({id: row.get('id'), email: row.get('user'), password: row.get('password') });
    })
  return usersFromSpreadsheet;

}

