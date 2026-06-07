import request from "supertest";
import app from "../../app.js";

describe(
  "GET /",
  () => {

    test(
      "Deve retornar API funcionando",
      async () => {

        const response =
          await request(app)
            .get("/");

        expect(
          response.status
        ).toBe(200);

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