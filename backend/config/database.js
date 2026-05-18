// backend/config/database.js
import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

export async function initializeDatabase() {
    try {
        // Configuramos el Pool de conexiones a Oracle
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
            poolMin: 2,
            poolMax: 10,
            poolIncrement: 1
        });
        console.log(' Conexión a Oracle 23ai establecida');
    } catch (err) {
        console.error(' Error conectando a Oracle:', err.message);
        process.exit(1); // Detiene el servidor si no hay base de datos
    }
}