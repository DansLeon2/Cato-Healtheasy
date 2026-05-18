import oracledb from 'oracledb';

export const getInventarioByPaciente = async (req, res) => {
    const { idPaciente } = req.params;
    let connection;

    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT m.nombre_comercial, i.stock_actual, i.estado_texto, m.uso_principal
             FROM inventario_paciente i
             JOIN medicamentos m ON i.id_medicamento = m.id_medicamento
             WHERE i.id_paciente = :id`,
            [idPaciente],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        res.status(200).json({ status: 'success', data: result.rows });
    } catch (error) {
        res.status(500).json({ status: 'error', mensaje: error.message });
    } finally {
        if (connection) await connection.close();
    }
};