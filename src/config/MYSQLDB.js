import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections:true,
  connectionLimit: 10,
  queueLimit: 0
});

// Emitted whenever a new physical connection is established in the pool
pool.on('connection', (connection) => {
  console.log('New MySQL connection established (Thread ID: %d)', connection.threadId);
});

// Helper function to test the initial connection on server start
export const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Currency engine successfully connected to MySQL database!');
    connection.release(); // Release connection back to the pool
  } catch (error) {
    console.error('MySQL initial connection failed:', error.message);
  }
};

export { pool };