
/**
 * ============================================================
 * swagger.js
 * ------------------------------------------------------------
 * Responsável pela configuração da documentação da API
 * utilizando Swagger (OpenAPI 3.0).
 *
 * Objetivos:
 * • Gerar automaticamente a documentação da API.
 * • Disponibilizar uma interface para testes das rotas.
 * • Documentar endpoints, parâmetros e autenticação.
 *
 * A documentação pode ser acessada através da rota:
 * /docs
 * ============================================================
 */

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/* ============================================================
 * Configuração do Swagger
 * ============================================================
 */

/**
 * Define as configurações da documentação OpenAPI.
 */
const options = {
  definition: {

    /**
     * Versão da especificação OpenAPI utilizada.
     */
    openapi: "3.0.0",

    /**
     * Informações gerais da API.
     */
    info: {
      title: "Catálogo de Materiais API",
      version: "1.0.0",
      description: "API para gerenciamento de materiais"
    },

    /**
     * Servidores disponíveis para acesso à API.
     */
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],

    /**
     * Configuração do método de autenticação JWT
     * utilizado pelas rotas protegidas.
     */
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    /**
     * Define o esquema de autenticação padrão
     * da documentação.
     */
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  /**
   * Arquivos onde o Swagger irá procurar
   * as anotações das rotas.
   */
  apis: [
    "./src/routes/*.js"
  ]
};

/* ============================================================
 * Geração da Documentação
 * ============================================================
 */

/**
 * Gera automaticamente a documentação Swagger
 * a partir das configurações definidas.
 */
const specs = swaggerJsdoc(options);

/**
 * Exporta a interface Swagger UI e a documentação
 * gerada para utilização na aplicação.
 */
export {
  swaggerUi,
  specs
};

