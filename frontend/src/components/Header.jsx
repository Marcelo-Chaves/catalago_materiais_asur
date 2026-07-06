export default function Header() {

  const usuario =
    JSON.parse(
      localStorage.getItem("usuario")
    );

  function logout() {

    localStorage.clear();

    window.location.href = "/";
  }

  return (
    <header className="header">

      <div>
        Bem-vindo, {usuario?.nome}
      </div>

      <button onClick={logout}>
        Sair
      </button>

    </header>
  );
}