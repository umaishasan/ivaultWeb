//for run test file use command : npx ts-node src/test.ts
import { poolPromise } from './DBKonnection'; // db.ts file ka path
import { Queries } from './Querys'; // Assuming you have a Queries module for SQL queries

export async function GetSysteHealth() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(Queries.SYS_HEALTH);
    //console.log('Query Result:', result.recordset);
    return { success: true, data: result.recordset };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function GetServerAvailability() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(Queries.SERVER_AVAILABILITY);
    //console.log('Query Result:', result.recordset);
    return { success: true, data: result.recordset };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function GetRbacData(){
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(Queries.RBAC_LIST);
    //console.log('Query Result:', result.recordset);
    return { success: true, data: result.recordset };
  } catch (err) {
    return { success: false, error: err };
  }
} 

export async function GetUserData(){
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(Queries.USER_DATA);
    //console.log('Query Result:', result.recordset);
    return { success: true, data: result.recordset };
  } catch (err) {
    return { success: false, error: err };
  }
} 

export async function GetDeviceConnection(){
  try{
    const pool = await poolPromise;
    const result = await pool.request().query(Queries.DEVICE_CONNECTION);
    //console.log('Query Result:', result.recordset);
    return { success: true, data: result.recordset };
  } catch (err){
    return { success: false, error: err }; 
  }
}

export async function LoginUser(email: string, password: string) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', email)
      .input('password', password)
      .query(Queries.LOGIN);

    if(result.recordset.length === 0) {
      return { success: false, error: 'Invalid email or password', data: [] };
    }
    
    return { success: true, data: result.recordset };
  } catch (err) {
    return { success: false, error: err };
  }
}

//GetDeviceConnection();