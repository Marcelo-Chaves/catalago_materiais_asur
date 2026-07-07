import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) { 
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        senha
      });

      console.log("USUARIO:", response.data.usuario);
      console.log("ROLE:", response.data.usuario?.role);
      console.log("TOKEN:", response.data.token);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
  "usuario",
  JSON.stringify(response.data.usuario)
);

const usuario = response.data.usuario;

if (usuario.tipo === "admin") {
  navigate("/dashboard");
} else {
  navigate("/catalogo");
}

      navigate("/dashboard");

    } catch (error) {
      console.log("ERRO COMPLETO:", error);
      console.log("RESPOSTA DO BACKEND:", error.response?.data);

      setErro(
        error.response?.data?.erro ||
        "Erro ao realizar login"
      );
    }
  }

  return (
    <div>
      <h1>Conecte-se</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>E-mail</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Senha</label>
          <br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Entrar</button>
      </form>

      {erro && <p>{erro}</p>}
    </div>
  );
}