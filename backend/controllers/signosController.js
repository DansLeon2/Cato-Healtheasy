import oracledb from 'oracledb';

export const getSignosByPaciente = async (req, res) => {
    const { idPaciente } = req.params;
    let connection;

    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(
            `SELECT TO_CHAR(fecha_medicion, 'DD/MM') as fecha, 
                    MAX(presion_sistolica) as presion_sistolica,    
                    MAX(presion_diastolica) as presion_diastolica
             FROM signos_vitales
             WHERE id_paciente = :id
             GROUP BY TO_CHAR(fecha_medicion, 'DD/MM'), TRUNC(fecha_medicion)
             ORDER BY TRUNC(fecha_medicion) DESC
             FETCH FIRST 5 ROWS ONLY`,
            [idPaciente],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        res.status(200).json({ status: 'success', data: result.rows.reverse() });
    } catch (error) {
        res.status(500).json({ status: 'error', mensaje: error.message });
    } finally {
        if (connection) await connection.close();
    }
};