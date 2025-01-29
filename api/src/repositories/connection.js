import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function initializeConnection() {
    try {
        const con = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PWD,
            database: process.env.DB,
            typeCast: function (field, next) {
                if (field.type === 'TINY' && field.length === 1) {
                    return (field.string() === '1');       // Verifica se o campo é do tipo TINYINT(1) e converte para boolean
                } else {
                    return next();
                }
            }
            
        });
        console.log('BD conectado com sucesso!');
        return con;
    } catch (err) {
        console.error('Error ao tentar conectar:', err);
        throw err;
    }
}

const con = await initializeConnection();
export { con };