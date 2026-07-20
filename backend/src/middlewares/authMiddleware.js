
/**
 * Verifica a autenticidade do token JWT enviado pelo cliente.
 *
 * Fluxo:
 * 1. Verifica se o cabeçalho Authorization foi enviado.
 * 2. Valida o formato do token (Bearer Token).
 * 3. Decodifica e valida o JWT.
 * 4. Armazena os dados do usuário na requisição.
 * 5. Permite o acesso à próxima etapa da aplicação.
 */
import jwt from "jsonwebtoken";

export function autenticarToken(
  req,
  res,
  next
) {

  // Obtém o cabeçalho Authorization da requisição.
  const authHeader =
    req.headers.authorization;

  // Verifica se o token foi enviado.
  if (!authHeader) {

    return res.status(401).json({
      erro: "Token não informado"
    });

  }

  // Separa o tipo do token e seu valor.
  const partes =
    authHeader.split(" ");

  // Valida o formato esperado: Bearer <token>.
  if (
    partes.length !== 2 ||
    partes[0] !== "Bearer"
  ) {

    return res.status(401).json({
      erro: "Formato do token inválido"
    });

  }

  // Obtém o token JWT.
  const token = partes[1];

  try {

    // Valida e decodifica o token utilizando a chave secreta.
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // Armazena os dados do usuário autenticado
    // para utilização nas próximas rotas.
    req.usuario =
      decoded;

    // Permite que a requisição continue.
    next();

  } catch (error) {

    // Retorna erro caso o token seja inválido ou tenha expirado.
    return res.status(401).json({
      erro:
        "Token inválido ou expirado"
    });

  }
}

