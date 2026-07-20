
/**
 * Middleware responsável por controlar a autorização
 * de acesso às rotas com base no perfil do usuário.
 *
 * Fluxo:
 * 1. Recebe a lista de perfis autorizados.
 * 2. Verifica se o usuário está autenticado.
 * 3. Confere se o perfil do usuário possui permissão.
 * 4. Permite o acesso ou retorna erro de autorização.
 *
 * @param {...string} roles - Perfis autorizados para acessar a rota.
 */
export function autorizar(...roles) {

  return (req, res, next) => {

    // Verifica se existe um usuário autenticado.
    if (!req.usuario) {
      return res.status(401).json({
        erro: "Usuário não autenticado"
      });
    }

    // Verifica se o perfil do usuário está entre os perfis autorizados.
    if (!roles.includes(req.usuario.role)) {
      return res.status(403).json({
        erro: "Acesso negado"
      });
    }

    // Permite que a requisição continue para o próximo middleware.
    next();

  };
}
