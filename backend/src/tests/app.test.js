/**
 * ============================================================
 * app.test.js
 * ------------------------------------------------------------
 * Responsável por testar as rotas principais da aplicação.
 *
 * Objetivo:
 * • Verificar se a API está respondendo corretamente.
 * • Garantir que a rota inicial "/" está disponível.
 *
 * Este teste utiliza o Supertest para realizar requisições
 * HTTP simuladas sem a necessidade de iniciar o servidor.
 * ============================================================
 */

import request from "supertest";
import app from "../../app.js";

/**
 * Teste da rota inicial da API.
 *
 * Valida:
 * • Código HTTP retornado.
 * • Estrutura da resposta JSON.
 */
describe(
  "GET /",
  () => {

    test(
      "Deve retornar API funcionando",
      async () => {

        // Realiza uma requisição GET para a rota principal.
        const response =
          await request(app)
            .get("/");

        // Verifica se a API retorna status de sucesso.
        expect(
          response.status
        ).toBe(200);

        // Verifica se a mensagem retornada
        // corresponde ao esperado.
        expect(
          response.body
        ).toEqual({
          mensagem:
            "API funcionando"
        });

      }
    );

  }
);