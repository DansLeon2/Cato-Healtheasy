import oracledb from 'oracledb';

export const procesarPreguntaIA = async (req, res) => {
    const { pregunta, idPaciente } = req.body;
    let connection;

    try {
        connection = await oracledb.getConnection();

        const texto = pregunta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        let respuestaHumana = "Lo siento, mi base de datos está limitada a consultar tus Citas Médicas o el Inventario de tus Medicinas.";
        let sqlEjecutado = "-- Esperando un comando reconocible...";
        let intencion = 'DESCONOCIDA';

        if (texto.includes('cita') || texto.includes('cuando') || texto.includes('doctor') || texto.includes('medico') || texto.includes('turno')) {
            intencion = 'CITA';
        } else if (texto.includes('medicina') || texto.includes('pastilla') || texto.includes('inventario') || texto.includes('cuanto') || texto.includes('quedan') || texto.includes('tengo')) {
            intencion = 'INVENTARIO';
        }

        if (intencion === 'INVENTARIO') {
            let parametroBusqueda = ""; 
            
            if (texto.match(/losartan|presion|losartán/)) parametroBusqueda = "%Losartán%";
            else if (texto.match(/insulina|azucar|glargina/)) parametroBusqueda = "%Insulina%";
            else if (texto.match(/calcio|huesos|vitamina d/)) parametroBusqueda = "%Calcio%";
            else if (texto.match(/levotiroxina|tiroides/)) parametroBusqueda = "%Levotiroxina%";
            else if (texto.match(/complejo|vitamina b/)) parametroBusqueda = "%Complejo%";
            else if (texto.match(/aspirina|dolor/)) parametroBusqueda = "%Aspirina%";

            if (parametroBusqueda === "") {
                return res.status(200).json({ 
                    status: 'success', pregunta, 
                    respuesta: "Para ver tu inventario necesito que me digas el nombre de la pastilla (Ej. '¿Cuánto Calcio me queda?' o '¿Tengo Insulina?').", 
                    sql: "-- Abortado: Falta entidad de medicamento." 
                });
            }

            sqlEjecutado = `SELECT m.nombre_comercial, i.stock_actual, i.estado_texto 
                            FROM inventario_paciente i 
                            JOIN medicamentos m ON i.id_medicamento = m.id_medicamento 
                            WHERE i.id_paciente = '${idPaciente}' AND LOWER(m.nombre_comercial) LIKE LOWER('${parametroBusqueda}')`;

            const result = await connection.execute(sqlEjecutado, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

            if (result.rows.length > 0) {
                const med = result.rows[0];
                respuestaHumana = `De ${med.NOMBRE_COMERCIAL || med.nombre_comercial} tienes ${med.STOCK_ACTUAL || med.stock_actual} unidades. Tu estado actual es: ${med.ESTADO_TEXTO || med.estado_texto}.`;
            } else {
                respuestaHumana = `No encontré ningún registro en tu inventario actual para esa medicina.`;
            }
        } 

        else if (intencion === 'CITA') {
            let filtroDoctor = "";
            
            if (texto.includes('carlos') || texto.includes('mendoza')) {
                filtroDoctor = "AND LOWER(m.nombre) LIKE '%carlos%'";
            } else if (texto.includes('roberto') || texto.includes('silva')) {
                filtroDoctor = "AND LOWER(m.nombre) LIKE '%roberto%'";
            
            } else if (texto.includes('juana')) {
                filtroDoctor = "AND LOWER(m.nombre) LIKE '%juana%'";
            
            } else if (texto.includes('ana') || texto.includes('lucia') || texto.includes('lucía')) {
                filtroDoctor = "AND LOWER(m.nombre) LIKE '%ana%'";
            }

            if (filtroDoctor === "") {
                return res.status(200).json({ 
                    status: 'success', 
                    pregunta: pregunta, 
                    respuesta: "Por favor, especifica la cita con quién y escribe nuevamente.", 
                    sql: "-- Ejecución abortada: Falta especificar el médico." 
                });
            }

            sqlEjecutado = `SELECT c.fecha_hora, m.nombre AS doctor, c.motivo, c.estado 
                            FROM citas c 
                            JOIN medicos m ON c.id_medico = m.id_medico 
                            WHERE c.id_paciente = '${idPaciente}' ${filtroDoctor}
                            ORDER BY c.fecha_hora DESC FETCH FIRST 1 ROWS ONLY`;

            const result = await connection.execute(sqlEjecutado, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

            if (result.rows.length > 0) {
                const med = result.rows[0];
                
                const nombreMed = med.NOMBRE_COMERCIAL || med.nombre_comercial;
                const estadoMed = med.ESTADO_TEXTO || med.estado_texto || "Desconocido";
                
                let stockMed = 0; 
                if (med.STOCK_ACTUAL !== undefined && med.STOCK_ACTUAL !== null) {
                    stockMed = med.STOCK_ACTUAL;
                } else if (med.stock_actual !== undefined && med.stock_actual !== null) {
                    stockMed = med.stock_actual;
                }
                
                respuestaHumana = `De ${nombreMed} tienes ${stockMed} unidades. Tu estado actual es: ${estadoMed}.`;
            } else {
                respuestaHumana = `No encontré ningún registro en tu inventario actual para esa medicina.`;
            }
        }

        res.status(200).json({ status: 'success', pregunta: pregunta, respuesta: respuestaHumana, sql: sqlEjecutado });

    } catch (error) {
        res.status(500).json({ status: 'error', respuesta: 'Error en el motor SQL dinámico.' });
    } finally {
        if (connection) await connection.close();
    }
};