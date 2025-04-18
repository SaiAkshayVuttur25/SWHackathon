import express from "express";
import pool from "./db/database.js";
import router from "./routes/shopRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    pool.query("SELECT * FROM customers", (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return;
        }
        console.log("Query results:", results);
    });
    res.send("hello");
});

app.use("/api",router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});