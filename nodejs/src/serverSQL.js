const sql = require("mssql");

const config = {
  server: "localhost",
  port: 1433,
  user: "sa",
  password: "123456",
  database: "nln",
  synchronize: true,
  trustServerCertificate: true,
  options: {
    enableArithAbort: true,
  },

  connectionTimeout: 150000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

sql.on("err", (err) => {
  console.log(err.message);
});
