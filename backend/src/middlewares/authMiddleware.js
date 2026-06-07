import jwt from "jsonwebtoken";

export function autenticarToken(
  req,
  res,
  next
) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: "Token não informado"
    });
  }

  const partes = authHeader.split(" ");

  if (
    partes.length !== 2 ||
    partes[0] !== "Bearer"
  ) {
    return res.status(401).json({
      erro: "Formato do token inválido"
    });
  }

  const token = partes[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      erro: "Token inválido ou expirado"
    });

  }
}