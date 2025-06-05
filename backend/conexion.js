import mysql from "mysql2/promise";
import "dotenv/config";

const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "adso",
      // port: 3306,
      // password: '',
});
console.log("Conexion Exitosa");


async function select(connection) {
  try {
      const sql = "SELECT * FROM `aprendiz`";

    const [rows, fields] = await connection.query(sql);

    console.log(rows);
    console.log(fields);
  } catch (err) {
    console.log(err);
  }
}
export default connection;

