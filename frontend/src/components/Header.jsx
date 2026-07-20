import "../styles/Header.scss";

export default function Header() {

  // Recupera os dados do usuário logado armazenados no navegador.
  // Caso não exista, retorna null para evitar erro no JSON.parse.
  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  // Realiza o logout do sistema.
  // Remove todas as informações da sessão e retorna para a tela de login.
  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "/";

  }

  return (

    <header className="header">

      <div className="header__info">

        <h1 className="header__title">
          Painel Administrativo
        </h1>

        <p className="header__subtitle">
          Bem-vindo de volta, {usuario?.nome}
        </p>

      </div>

      <div className="header__user">

        <div className="header__profile">

          <span className="header__name">
            👤 {usuario?.nome}
          </span>

          <span className="header__role">
            {usuario?.role === "admin"
              ? "Administrador"
              : usuario?.role}
          </span>

        </div>

        <button
          className="header__logout"
          onClick={logout}
        >
          🚪 Sair
        </button>

      </div>

    </header>

  );

}