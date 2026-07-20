/**
 * Verifica se o usuário autenticado possui perfil de administrador.
 *
 * Fluxo:
 * 1. Obtém as informações do usuário autenticado.
 * 2. Verifica se o perfil é "admin".
 * 3. Permite o acesso à rota ou retorna erro de autorização.
 */
export function somenteAdmin(
  req,
  res,
  next
) {

  // Verifica se o usuário possui permissão de administrador.
  if (
    req.usuario.role !== "admin"
  ) {
    return res.status(403).json({
      erro: "Acesso negado"
    });
  }

  // Permite que a requisição continue para o próximo middleware.
  next();
}