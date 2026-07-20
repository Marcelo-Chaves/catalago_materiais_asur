
/**
 * Middleware global para tratamento de erros da aplicação.
 *
 * Fluxo:
 * 1. Recebe o erro gerado durante a execução da requisição.
 * 2. Registra o erro no console do servidor.
 * 3. Retorna ao cliente o código HTTP correspondente.
 * 4. Envia a mensagem de erro em formato JSON.
 */
export function errorHandler(
  error,
  req,
  res,
  next
) {

  // Registra o erro no console para fins de depuração.
  console.error(error);

  // Retorna o código HTTP definido pelo erro.
  // Caso não exista, utiliza o código 500 (Erro Interno).
  return res.status(
    error.status || 500
  ).json({

    // Retorna a mensagem do erro.
    // Caso não exista, utiliza uma mensagem padrão.
    erro:
      error.message ||
      "Erro interno do servidor"

  });
}

