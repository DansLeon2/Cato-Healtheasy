// backend/docs/swaggerConfig.js

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "HealthEasy REST API - Módulo D6",
    version: "1.0.0",
    description: "Documentación oficial de los endpoints para el sistema HealthEasy. Incluye operaciones CRUD sobre JSON Duality Views (D8) de Oracle 23ai."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor Local de Desarrollo"
    }
  ],
  paths: {
    "/api/v1/pacientes/{id}": {
      get: {
        summary: "Obtiene el expediente clínico de un paciente (JSON Duality View)",
        tags: ["Pacientes (Duality Views)"],
        parameters: [
          { name: "id", in: "path", required: true, description: "ID del Paciente (Ej. P-902)", schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Expediente JSON obtenido exitosamente." },
          404: { description: "Paciente no encontrado." }
        }
      },
      patch: {
        summary: "Actualiza el expediente anidado de un paciente",
        tags: ["Pacientes (Duality Views)"],
        parameters: [
          { name: "id", in: "path", required: true, description: "ID del Paciente (Ej. P-902)", schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  documentoJson: { type: "object", description: "El JSON completo con los datos a actualizar" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Documento actualizado correctamente." }
        }
      }
    },
    "/api/v1/pacientes": {
      post: {
        summary: "Registra un nuevo paciente y sus citas (JSON Duality View)",
        tags: ["Pacientes (Duality Views)"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  documentoJson: {
                    "_id": "P-999",
                    "nombre": "Clotilde Bazán",
                    "edad": 78
                  }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Paciente insertado correctamente en las tablas relacionales." }
        }
      }
    },
    "/api/v1/citas/paciente/{idPaciente}": {
      get: {
        summary: "Obtiene la agenda general de citas de un paciente",
        tags: ["Consultas Relacionales"],
        parameters: [
          { name: "idPaciente", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Lista de citas devuelta." }
        }
      }
    }
  }
};