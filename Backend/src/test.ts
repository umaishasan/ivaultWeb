import { poolPromise } from './DBKonnection'; // db.ts file ka path

//for run test file use command : npx ts-node src/test.ts
async function testConnection() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM [dbo].[User]');
    console.log('Query Result:', result.recordset);
    process.exit(0);
  } catch (err) {
    console.error('Execution Error:', err);
    process.exit(1);
  }
}

testConnection();