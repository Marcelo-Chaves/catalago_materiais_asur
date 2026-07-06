import jwt from "jsonwebtoken";

export function autenticarToken(
  req,
  res,
  next
) {

  console.log(
    "AUTHORIZATION:",
    req.headers.authorization
  );

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    console.log(
      "Token não informado"
    );

    return res.status(401).json({
      erro: "Token não informado"
    });
  }

  const partes =
    authHeader.split(" ");

  if (
    partes.length !== 2 ||
    partes[0] !== "Bearer"
  ) {

    console.log(
      "Formato do token inválido"
    );

    return res.status(401).json({
      erro: "Formato do token inválido"
    });
  }

  const token = partes[1];

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log(
      "TOKEN DECODIFICADO:",
      decoded
    );

    req.usuario =
      decoded;

    next();

  } catch (error) {

    console.log(
      "ERRO JWT:",
      error.message
    );

    return res.status(401).json({
      erro:
        "Token inválido ou expirado"
    });
  }
}