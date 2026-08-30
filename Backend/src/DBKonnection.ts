// import sql from 'mssql';
//import type { config as SqlConfig, ConnectionPool } from 'mssql';
import sql from 'mssql/msnodesqlv8';
import type { config as SqlConfig, ConnectionPool } from 'mssql/msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const configuredServer = process.env.DB_SERVER || 'localhost';
const [server, instanceName] = configuredServer.split('\\', 2);
const databaseServer = server === '.' ? 'localhost' : server || 'localhost';

// const dbConfig: SqlConfig = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: databaseServer,
//   database: process.env.DB_DATABASE,
//   ...(instanceName ? {} : { port: parseInt(process.env.DB_PORT || '1433', 10) }),
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//     ...(instanceName ? { instanceName } : {}),
//   },
// };
const dbConfig: SqlConfig = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE,
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    instanceName: process.env.DB_INSTANCE, // agar named instance hai, e.g. SQLEXPRESS
  },
};

export const poolPromise: Promise<ConnectionPool> = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool: ConnectionPool) => {
    console.log('Connected to SQL Server successfully');
    return pool;
  })
  .catch((err: unknown) => {
    console.error('Database Connection Failed: ', err);
    process.exit(1);
  });

export { sql };