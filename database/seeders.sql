-- ==============================================================================
-- 5. INSERCIÓN DE DATOS DE PRUEBA (SEEDERS)
-- ==============================================================================

-- Paciente
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-902', 'Ernesto Martínez', 72);

-- Médicos
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-001', 'Dr. Carlos Mendoza', 'Cardiología', 'Cons. 102');
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-002', 'Dra. Ana Lucía', 'Medicina General', 'Cons. 105');
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-003', 'Dr. Roberto Silva', 'Endocrinología', 'Cons. 201');

-- Medicamentos
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-01', 'Losartán 50mg', 'Para la presión alta');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-02', 'Insulina Glargina', 'Control de azúcar');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-03', 'Calcio + Vitamina D', 'Suplemento diario');

-- Citas (Futuras y Pasadas)
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) 
VALUES ('P-902', 'M-001', SYSDATE - 5, 'Control Hipertensión', 'Completada');

INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) 
VALUES ('P-902', 'M-001', SYSDATE + 1, 'Revisión de presión arterial', 'Pendiente');

INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) 
VALUES ('P-902', 'M-002', SYSDATE + 24, 'Chequeo General', 'Pendiente');

-- Recetas
-- Obtenemos el ID de la cita completada y le asignamos Losartán
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada)
VALUES (1, 'MED-01', '1 cada 24h', '3 cajas');

-- Inventario de Don Ernesto
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-902', 'MED-01', 90, 'Lleno');
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-902', 'MED-03', 5, 'Quedan 5 unidades');
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-902', 'MED-02', 0, 'Vacío');

-- Presión Arterial (Últimos 5 días para la gráfica)
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 4, 125, 82);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 3, 130, 85);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 2, 118, 79);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 1, 145, 90);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE, 120, 80);

-- ==============================================================================
-- 6. INSERCIÓN DE MAS DATOS DE PRUEBA (SEEDERS)
-- ==============================================================================

-- ==============================================================================
-- INSERCIÓN MASIVA DE DATOS (SEEDERS REALISTAS PARA DEMOSTRACIÓN)
-- ==============================================================================

-- 6.1. CATÁLOGO DE MÉDICOS (6 Especialistas)
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-001', 'Dr. Carlos Mendoza', 'Cardiología', 'Cons. 102');
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-002', 'Dra. Ana Lucía', 'Medicina General', 'Cons. 105');
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-003', 'Dr. Roberto Silva', 'Endocrinología', 'Cons. 201');
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-004', 'Dra. Elena Torres', 'Geriatría', 'Cons. 110');
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-005', 'Dr. Javier Gómez', 'Neurología', 'Cons. 305');
INSERT INTO medicos (id_medico, nombre, especialidad, consultorio) VALUES ('M-006', 'Dra. Patricia Ríos', 'Reumatología', 'Cons. 204');

-- 6.2. CATÁLOGO DE PACIENTES (20 Pacientes, mayoría tercera edad)
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-902', 'Ernesto Martínez', 72); -- Usuario Principal Demo
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-001', 'Rosaura Domínguez', 81);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-002', 'Julio César Vargas', 68);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-003', 'María Luisa Peña', 75);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-004', 'Humberto Castro', 85);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-005', 'Carmen Salinas', 64);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-006', 'Raúl Jiménez', 79);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-007', 'Teresa Blanco', 71);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-008', 'Miguel Ángel Ruiz', 88);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-009', 'Luz María López', 67);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-010', 'Fernando Ortega', 74);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-011', 'Beatriz Montero', 82);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-012', 'Jorge Dávila', 69);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-013', 'Silvia Pinal', 91);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-014', 'Alberto Solís', 76);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-015', 'Norma Herrera', 70);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-016', 'Víctor Hugo Paz', 84);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-017', 'Gloria Treviño', 66);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-018', 'Manuel Beltrán', 77);
INSERT INTO pacientes (id_paciente, nombre, edad) VALUES ('P-019', 'Alicia Villareal', 80);

-- 6.3. CATÁLOGO DE MEDICAMENTOS (20 Medicinas comunes)
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-01', 'Losartán 50mg', 'Presión arterial');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-02', 'Insulina Glargina', 'Diabetes');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-03', 'Calcio + Vitamina D', 'Osteoporosis');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-04', 'Aspirina Protect 100mg', 'Prevención infartos');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-05', 'Metformina 850mg', 'Diabetes Tipo 2');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-06', 'Omeprazol 20mg', 'Protector gástrico');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-07', 'Atorvastatina 20mg', 'Reducción colesterol');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-08', 'Amlodipino 5mg', 'Presión arterial alta');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-09', 'Levotiroxina 100mcg', 'Hipotiroidismo');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-10', 'Paracetamol 500mg', 'Dolor general y fiebre');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-11', 'Ibuprofeno 400mg', 'Antiinflamatorio');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-12', 'Diclofenaco en gel', 'Dolor articular');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-13', 'Clopidogrel 75mg', 'Anticoagulante');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-14', 'Pantoprazol 40mg', 'Reflujo gástrico');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-15', 'Pregabalina 75mg', 'Dolor neuropático');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-16', 'Complejo B', 'Suplemento vitamínico');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-17', 'Enalapril 10mg', 'Hipertensión');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-18', 'Alprazolam 0.5mg', 'Ansiedad e insomnio');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-19', 'Glimepirida 2mg', 'Control de glucosa');
INSERT INTO medicamentos (id_medicamento, nombre_comercial, uso_principal) VALUES ('MED-20', 'Tamsulosina 0.4mg', 'Próstata');

-- 6.4. CITAS (Pasadas y Futuras para poblar historiales y queries de pendientes)
-- Citas de Ernesto (P-902)
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-902', 'M-001', SYSDATE - 60, 'Chequeo inicial', 'Completada');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-902', 'M-003', SYSDATE - 15, 'Exámenes tiroides', 'Completada');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-902', 'M-001', SYSDATE + 1, 'Revisión presión', 'Pendiente');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-902', 'M-002', SYSDATE + 20, 'Chequeo general', 'Pendiente');

-- Citas Atrasadas (Para que el Query 01 del catálogo funcione)
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-001', 'M-004', SYSDATE - 10, 'Control geriátrico', 'Pendiente');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-004', 'M-001', SYSDATE - 5, 'Arritmia', 'Pendiente');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-008', 'M-006', SYSDATE - 2, 'Dolor rodilla', 'Pendiente');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-013', 'M-005', SYSDATE - 30, 'Pérdida memoria', 'Pendiente');

-- Citas Varias Completadas
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-002', 'M-002', SYSDATE - 45, 'Gripe fuerte', 'Completada');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-003', 'M-006', SYSDATE - 12, 'Artritis', 'Completada');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-005', 'M-003', SYSDATE - 50, 'Diabetes control', 'Completada');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-007', 'M-001', SYSDATE - 5, 'Taquicardia', 'Completada');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-011', 'M-004', SYSDATE - 8, 'Insomnio', 'Completada');
INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo, estado) VALUES ('P-016', 'M-005', SYSDATE - 22, 'Migraña', 'Completada');

-- 6.5. RECETAS (Conectadas a las citas completadas)
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (1, 'MED-01', '1 cada 24h', '3 cajas');
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (2, 'MED-09', '1 en ayunas', '2 frascos');
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (9, 'MED-10', '1 cada 8h', '1 caja');
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (10, 'MED-12', 'Aplicar 2 veces al día', '2 tubos');
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (11, 'MED-05', '1 cada 12h', '4 cajas');
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (12, 'MED-08', '1 cada 24h', '2 cajas');
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (13, 'MED-18', '0.5mg antes de dormir', '1 frasco');
INSERT INTO recetas (id_cita, id_medicamento, dosis_texto, cantidad_recetada) VALUES (14, 'MED-15', '1 cada 12h', '2 cajas');

-- 6.6. INVENTARIOS DE PACIENTES (Para probar alertas de stock bajo)
-- Ernesto
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-902', 'MED-01', 90, 'Lleno');
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-902', 'MED-03', 5, 'Quedan 5 unidades');
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-902', 'MED-09', 0, 'Vacío');
-- Otros
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-003', 'MED-12', 1, 'Quedan 1 unidades');
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-005', 'MED-05', 45, 'Lleno');
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-008', 'MED-10', 0, 'Vacío');
INSERT INTO inventario_paciente (id_paciente, id_medicamento, stock_actual, estado_texto) VALUES ('P-011', 'MED-18', 20, 'Lleno');

-- 6.7. SIGNOS VITALES (Para Ernesto P-902, para que la gráfica tenga datos reales de las últimas semanas)
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 14, 135, 88);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 10, 140, 90);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 7, 128, 85);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 4, 125, 82);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 3, 130, 85);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 2, 118, 79);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE - 1, 145, 90);
INSERT INTO signos_vitales (id_paciente, fecha_medicion, presion_sistolica, presion_diastolica) VALUES ('P-902', SYSDATE, 120, 80);

COMMIT;
