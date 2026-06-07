export function somenteAdmin(
  req,
  res,
  next
) {
  if (
    req.usuario.role !== "admin"
  ) {
    return res.status(403).json({
      erro: "Acesso negado"
    });
  }

  next();
}