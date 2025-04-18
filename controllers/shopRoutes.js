import pool from "../db/database.js"

export const getCategoryShops = async (req, res) => {

    const {category} = req.params;

    const quer = `SELECT DISTINCT v.vendor_id, v.name AS vendor_name, v.location, p.category 
                FROM vendors v 
                JOIN vendor_products vp ON v.vendor_id = vp.vendor_id 
                JOIN products p ON vp.product_id = p.product_id 
                WHERE p.category = ? `

    try {
        pool.query(quer,[category], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return;
            }
            console.log("Query results:", results);
            res.status(200).json({
                data:results, 
            });
        });
    } catch (err) {
      res.send({ message: 0 });
    }
};

export const LoginUSer =  async (req, res) => {

    const {name , email , phoneNo , address} = req.body;

    if(!name || !email || !phoneNo || !address){
        return res.status(400).json({ error :""})
    }

    const quer = "INSERT INTO CUSTOMERS (name,email ,phone , address ) VALUES (?,?,?,?)"

    try{
        pool.query(quer ,  [name , email ,phoneNo , address ], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return;
            }
            console.log("Query results:", results);
            res.status(200).json({
                data:results, 
                message:success
            });
        });

    } catch (err){

        console.log(err.message);
        return res.status(200).json({
            success:false,
            message:err.message
        });
    }
}

export const LogoutUser = async (req, res) => {
    const { customer_id } = req.body;

    if (!customer_id) {
        return res.status(400).json({ error: "Customer ID is required." });
    }

    const query = "DELETE FROM CUSTOMERS WHERE customer_id = ?";

    try {
        pool.query(query, [customer_id], (error, results) => {
            if (error) {
                console.error("Error executing delete query:", error);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ success: false, message: "Customer not found." });
            }

            console.log("Customer deleted:", results);
            return res.status(200).json({ success: true, message: "Customer logged out and deleted successfully." });
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const LoginVendor =  async (req, res) => {

    const {name , email , phoneNo , address} = req.body;

    if(!name || !email || !phoneNo || !address){
        return res.status(400).json({ error :""})
    }

    const quer = "INSERT INTO VENDORS (name,email ,phone , address ) VALUES (?,?,?,?)"

    try{
        pool.query(quer , [name , email ,phoneNo , address ], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return;
            }
            console.log("Query results:", results);
        });

    } catch (err){

        console.log(err.message);
        return res.status(200).json({
            success:false,
            message:err.message
        });
    }
}

export const LogoutVendor = async (req, res) => {
    const { customer_id } = req.body;

    if (!customer_id) {
        return res.status(400).json({ error: "Customer ID is required." });
    }

    const query = "DELETE FROM CUSTOMERS WHERE customer_id = ?";

    try {
        pool.query(query, [customer_id], (error, results) => {
            if (error) {
                console.error("Error executing delete query:", error);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ success: false, message: "Customer not found." });
            }

            console.log("Customer deleted:", results);
            return res.status(200).json({ success: true, message: "Customer logged out and deleted successfully." });
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getProductsofVendor = async (req, res) => {

    const {id} = req.params;

    const quer = `SELECT p.product_id, p.name AS product_name, p.category, p.description, p.image_url, vp.stock, p.price
                FROM vendor_products vp
                JOIN products p 
                ON vp.product_id = p.product_id
                WHERE vp.vendor_id = ?;`

    try {
        pool.query(quer,[id], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return;
            }
            console.log("Query results:", results);
            res.status(200).json({
                data:results, 
            });
        });
    } catch (err) {
      res.send({ message: 0 });
    }
};

export const AddToCart = async (req, res) => {

    const { customer_id, vendor_id, product_id, quantity } = req.query;

    const quer = `INSERT INTO cart (customer_id, vendor_id, product_id, quantity)
                    VALUES (? , ? ,? ,?)`

    try {
        pool.query(quer,[customer_id, vendor_id, product_id, quantity], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return;
            }
            console.log("Query results:", results);
        });
        res.status(200).json({
            data:results, 
        });
    } catch (err) {
      res.send({ message: 0 });
    }
};


export const DisplayCart = async (req, res) => {

    const { customer_id } = req.params;

    const quer = `SELECT 
    c.cart_id,
    p.product_id,
    p.name AS product_name,
    p.category,
    p.description,
    p.image_url,
    v.vendor_id,
    v.name AS vendor_name,
    v.location AS vendor_location,
    p.price,
    c.quantity,
    (c.quantity * p.price) AS total_price,
    c.added_at
FROM cart c
JOIN products p ON c.product_id = p.product_id
JOIN vendors v ON c.vendor_id = v.vendor_id
WHERE c.customer_id = ?`

    try {
        pool.query(quer ,[customer_id], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return;
            }
            console.log("Query results:", results);
            res.status(200).json({
                data:results, 
            });
        });
    } catch (err) {
      res.send({ message: 0 });
    }
};


export const filterByLocation = async (req,res) => {

    const {customer_id} = req.params;

    const quer = `SELECT 
                v.vendor_id,
                v.name AS vendor_name,
                v.location,
                v.phone
                FROM vendors v
                JOIN customers c ON v.location = c.address
                WHERE c.customer_id = ?; `

    try {
        pool.query(quer,[customer_id], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return;
            }
            console.log("Query results:", results);
        });
        res.status(200).json({
            data:results, 
        });
    } catch (err) {
        res.send({ message: 0 });
    }
}


// export const BuyProduct  = async (req,res) => {

//     const {customer_id,price_at_purchase,quantity,vendor_product_id} = req.body;

//     const total_price = quantity * price_at_purchase;

//     const quer = `DELIMITER //
//                 CREATE TRIGGER reduce_stock_after_order
//                 AFTER INSERT ON order_details
//                 FOR EACH ROW
//                 BEGIN
//                 UPDATE vendor_products
//                 SET stock = stock - NEW.quantity
//                 WHERE vendor_product_id = NEW.vendor_product_id;
//                 END;
//                 //
//                 DELIMITER ;

//                 INSERT INTO orders (customer_id, total_price)
//                 VALUES (${customer_id}, ${total_price});

//                 SET @new_order_id = LAST_INSERT_ID();

//                 INSERT INTO order_details (order_id, vendor_product_id, quantity, price_at_purchase)
//                 VALUES 
//                 (@new_order_id, ${vendor_product_id}, ${quantity}, ${price_at_purchase}),`

//     try {
//         pool.query(quer, (error, results) => {
//             if (error) {
//                 console.error("Error executing query:", error);
//                 return;
//             }
//             console.log("Query results:", results);
//         });
//         res.status(200).json({
//             data:results, 
//         });
//     } catch (err) {
//         res.send({ message: 0 });
//     }
// }

export const BuyProduct = async (req, res) => {

    const { customer_id, price_at_purchase, quantity, vendor_product_id } = req.body;
    const total_price = quantity * price_at_purchase;

    const createOrderQuery = `
        INSERT INTO orders (customer_id, total_price)
        VALUES (?, ?);
    `;

    const createOrderDetailsQuery = `
        INSERT INTO order_details (order_id, vendor_product_id, quantity, price_at_purchase)
        VALUES (LAST_INSERT_ID(), ?, ?, ?);
    `;

    const updateStockQuery = `
        UPDATE vendor_products
        SET stock = stock - ?
        WHERE vendor_product_id = ?;
    `;

    try {
        // const connection = await pool.getConnection();
        
        try {
            // await connection.beginTransaction();

            const [orderResults] = await connection.query(createOrderQuery, [customer_id, total_price]);
            
            const [detailsResults] = await connection.query(createOrderDetailsQuery, 
                [vendor_product_id, quantity, price_at_purchase]);
            
            const [updateResults] = await connection.query(updateStockQuery, 
                [quantity, vendor_product_id]);
            
            // await connection.commit();

            res.status(200).json({
                success: true,
                orderId: orderResults.insertId,
                details: detailsResults,
                stockUpdated: updateResults.affectedRows > 0
            });
        } catch (error) {
            await connection.rollback();
            console.error("Transaction error:", error);
            res.status(500).json({ success: false, message: "Transaction failed" });
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
};