// backend/controllers/citasController.js
import oracledb from 'oracledb';

// Obtener todas las citas de un paciente
export const getCitasByPaciente = async (req, res) => {
    const { idPaciente } = req.params; // Extrae el ID de la URL (Ej: P-902)
    let connection;

    try {
        connection = await oracledb.getConnection();
        
        // Ejecutamos el Query con variables seguras (:id) para evitar SQL Injection
        const result = await connection.execute(
            `SELECT c.fecha_hora, m.nombre AS doctor, m.especialidad, c.motivo, c.estado
             FROM citas c
             JOIN medicos m ON c.id_medico = m.id_medico
             WHERE c.id_paciente = :id
             ORDER BY c.fecha_hora ASC`,
            [idPaciente],
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // Formato JSON
        );

        // Si no hay citas, devolvemos un 404
        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'warning', mensaje: 'No se encontraron citas para este paciente', data: [] });
        }

        // Respuesta exitosa (Status 200)
        res.status(200).json({
            status: 'success',
            resultados: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', mensaje: 'Error interno del servidor', detalle: error.message });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
};