-- ==============================================================================
-- PROYECTO: HEALTHEASY - PORTAL DEL ADULTO MAYOR (ORACLE 23ai)
-- ==============================================================================

-- 1. LIMPIEZA PREVIA (Por si necesitas correr el script varias veces)
BEGIN
   EXECUTE IMMEDIATE 'DROP VIEW paciente_historial_dv';
EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN
   FOR cur_rec IN (SELECT table_name FROM user_tables WHERE table_name IN ('AUDITORIA', 'SIGNOS_VITALES', 'INVENTARIO_PACIENTE', 'RECETAS', 'CITAS', 'MEDICAMENTOS', 'MEDICOS', 'PACIENTES')) LOOP
      EXECUTE IMMEDIATE 'DROP TABLE ' || cur_rec.table_name || ' CASCADE CONSTRAINTS';
   END LOOP;
END;
/

-- ==============================================================================
-- 2. CREACIÓN DE TABLAS (DDL)
-- ==============================================================================

CREATE TABLE pacientes (
    id_paciente VARCHAR2(10) PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    edad NUMBER(3) NOT NULL,
    fecha_registro DATE DEFAULT SYSDATE
);

CREATE TABLE medicos (
    id_medico VARCHAR2(10) PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    especialidad VARCHAR2(50) NOT NULL,
    consultorio VARCHAR2(20)
);

CREATE TABLE medicamentos (
    id_medicamento VARCHAR2(10) PRIMARY KEY,
    nombre_comercial VARCHAR2(100) NOT NULL,
    uso_principal VARCHAR2(150)
);

CREATE TABLE citas (
    id_cita NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_paciente VARCHAR2(10) REFERENCES pacientes(id_paciente),
    id_medico VARCHAR2(10) REFERENCES medicos(id_medico),
    fecha_hora TIMESTAMP NOT NULL,
    motivo VARCHAR2(150),
    estado VARCHAR2(20) CHECK (estado IN ('Pendiente', 'Completada', 'Cancelada'))
);

CREATE TABLE recetas (
    id_receta NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_cita NUMBER REFERENCES citas(id_cita),
    id_medicamento VARCHAR2(10) REFERENCES medicamentos(id_medicamento),
    dosis_texto VARCHAR2(100) NOT NULL,
    cantidad_recetada VARCHAR2(50)
);

CREATE TABLE inventario_paciente (
    id_paciente VARCHAR2(10) REFERENCES pacientes(id_paciente),
    id_medicamento VARCHAR2(10) REFERENCES medicamentos(id_medicamento),
    stock_actual NUMBER(4) DEFAULT 0,
    estado_texto VARCHAR2(20), -- Lleno, Quedan N, Vacío
    PRIMARY KEY (id_paciente, id_medicamento)
);

CREATE TABLE signos_vitales (
    id_registro NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_paciente VARCHAR2(10) REFERENCES pacientes(id_paciente),
    fecha_medicion DATE NOT NULL,
    presion_sistolica NUMBER(3) NOT NULL,
    presion_diastolica NUMBER(3) NOT NULL
);

-- Tabla para el Entregable: Auditoría / Historial de Actividad (PL/SQL)
CREATE TABLE auditoria (
    id_log NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tabla_afectada VARCHAR2(50),
    operacion VARCHAR2(20),
    fecha TIMESTAMP DEFAULT SYSTIMESTAMP,
    detalles VARCHAR2(255)
);

-- ==============================================================================
-- 3. PL/SQL: TRIGGER DE AUDITORÍA (Entregable D4/D5)
-- ==============================================================================
-- Este trigger vigila la tabla CITAS. Si alguien inserta o actualiza una cita,
-- se guarda automáticamente en la tabla de auditoría.
CREATE OR REPLACE TRIGGER trg_auditar_citas
AFTER INSERT OR UPDATE ON citas
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO auditoria (tabla_afectada, operacion, detalles)
        VALUES ('CITAS', 'INSERT', 'Nueva cita creada para paciente ' || :NEW.id_paciente);
    ELSIF UPDATING THEN
        INSERT INTO auditoria (tabla_afectada, operacion, detalles)
        VALUES ('CITAS', 'UPDATE', 'Cita ' || :NEW.id_cita || ' cambió estado a ' || :NEW.estado);
    END IF;
END;
/

-- ==============================================================================
-- 4. JSON DUALITY VIEW (Entregable D8)
-- ==============================================================================
-- Requisito clave de Oracle 23ai: Permite consultar y modificar datos relacionales
-- como si fueran documentos JSON (Ideal para tu API REST).
CREATE OR REPLACE JSON RELATIONAL DUALITY VIEW paciente_historial_dv AS
SELECT JSON {'id_paciente': p.id_paciente,
             'nombre': p.nombre,
             'edad': p.edad,
             'citas': [ SELECT JSON {'id_cita': c.id_cita,
                                     'fecha': c.fecha_hora,
                                     'estado': c.estado,
                                     'medico': (SELECT m.nombre FROM medicos m WHERE m.id_medico = c.id_medico)}
                        FROM citas c WITH INSERT UPDATE DELETE
                        WHERE c.id_paciente = p.id_paciente ]}
FROM pacientes p WITH INSERT UPDATE DELETE;

-- VISTA 2: Detalles del Médico y su Agenda de Citas Anidada
CREATE OR REPLACE JSON RELATIONAL DUALITY VIEW medico_agenda_dv AS
SELECT JSON {
    '_id'          : m.id_medico,
    'nombre'       : m.nombre,
    'especialidad' : m.especialidad,
    'consultorio'  : m.consultorio,
    'citas_asignadas' : [
        SELECT JSON {
            '_id'         : c.id_cita,
            'id_paciente' : c.id_paciente,
            'fecha_hora'  : c.fecha_hora,
            'motivo'      : c.motivo,
            'estado'      : c.estado
        }
        FROM citas c WITH INSERT UPDATE DELETE
        WHERE c.id_medico = m.id_medico
    ]
}
FROM medicos m WITH INSERT UPDATE DELETE;
/

-- VISTA 3: Información de Medicamentos y Relación de Inventarios Activos
CREATE OR REPLACE JSON RELATIONAL DUALITY VIEW medicamento_receta_dv AS
SELECT JSON {
    '_id'              : m.id_medicamento,
    'nombre_comercial' : m.nombre_comercial,
    'uso_principal'    : m.uso_principal,
    'distribucion_pacientes' : [
        SELECT JSON {
            '_id'          : i.id_paciente, -- Llave primaria compuesta de la tabla relacional intermedia
            'stock_actual' : i.stock_actual,
            'estado_texto' : i.estado_texto
        }
        FROM inventario_paciente i WITH INSERT UPDATE DELETE
        WHERE i.id_medicamento = m.id_medicamento
    ]
}
FROM medicamentos m WITH INSERT UPDATE DELETE;
/

