
// import { query } from "express";
// import { createConnection } from "mysql";

import mysql from "mysql";

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sai",
    database: "hackathon",
    connectionLimit: 10,
});

export default pool;



