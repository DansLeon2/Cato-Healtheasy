// backend/controllers/pacienteController.js
import oracledb from 'oracledb';

// GET: Obtener el expediente JSON anidado del paciente
export const getPacienteJSON = async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT data FROM paciente_historial_dv v WHERE v.data."_id" = :id`,
            [id],
            { outFormat: oracledb.OUT_FORMAT_OBJECT } 
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'error', mensaje: 'Paciente no encontrado' });
        }

        res.json({ status: 'success', metodo: 'GET', data: result.rows[0].DATA });
    } catch (error) {
        res.status(500).json({ status: 'error', mensaje: error.message });
    } finally {
        if (connection) await connection.close();
    }
};

// POST: Registrar un nuevo paciente junto con sus citas en un solo JSON
export const createPacienteJSON = async (req, res) => {
    const { documentoJson } = req.body; 
    let connection;
    try {
        connection = await oracledb.getConnection();
        
        // Pasamos el objeto JSON directamente como un string serializado a la vista
        await connection.execute(
            `INSERT INTO paciente_historial_dv VALUES (:json_doc)`,
            [JSON.stringify(documentoJson)]
        );
        
        // Confirmamos la transacción relacional
        await connection.commit();

        res.status(201).json({
            status: 'success',
            metodo: 'POST (Insert via Duality View)',
            mensaje: 'Paciente y registros dependientes creados correctamente en Oracle 23ai.'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', mensaje: error.message });
    } finally {
        if (connection) await connection.close();
    }
};

// PATCH: Actualizar campos o añadir elementos al arreglo interno de citas
export const updatePacienteJSON = async (req, res) => {
    const { id } = req.params;
    const { documentoJson } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection();
     
        documentoJson._id = id;

        await connection.execute(
            `UPDATE paciente_historial_dv v SET v.data = :json_doc WHERE v.data."_id" = :id`,
            [JSON.stringify(documentoJson), id]
        );
        await connection.commit();

        res.status(200).json({
            status: 'success',
            metodo: 'PATCH (Update via Duality View)',
            mensaje: 'Documento e historiales relacionales sincronizados con éxito.'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', mensaje: error.message });
    } finally {
        if (connection) await connection.close();
    }
};