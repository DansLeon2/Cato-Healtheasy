import oracledb from 'oracledb';

export const getLogsAuditoria = async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT id_log, tabla_afectada, operacion, TO_CHAR(fecha, 'YYYY-MM-DD HH24:MI:SS') as fecha, detalles
             FROM auditoria
             ORDER BY fecha DESC`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        res.status(200).json({ status: 'success', data: result.rows });
    } catch (error) {
        res.status(500).json({ status: 'error', mensaje: error.message });
    } finally {
        if (connection) await connection.close();
    }
};