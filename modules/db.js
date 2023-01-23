const mssql = require("mssql");

const sqlConfig = {
  user: `sara`,
  password: `S123r4546!`,
  server: "185.28.152.220",
  database: `main`,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
  },
};

module.exports.connection = mssql;
module.exports.sqlConfig = sqlConfig;
