//Internal
import { pool } from "../../../config/MYSQLDB.js";

const userRegistrationRepository = async (userData) => {
    try {
        const {user_name, user_email, user_password} = userData;
        const query = `INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)`;
        const values = [user_name, user_email, user_password];
        const [result] = await pool.query(query, values);  
        
        // 2. Query the newly created row using insertId
        const selectQuery = `SELECT user_id, user_name, user_email, created_at FROM users WHERE user_id = ?`;
        const [rows] = await pool.query(selectQuery, [result.insertId]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

//export 
export {
    userRegistrationRepository
}