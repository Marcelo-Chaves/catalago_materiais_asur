import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import "../styles/Login.scss";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    setErro("");
    setLoading(true);

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          senha
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          response.data.usuario
        )
      );

      const usuario =
        response.data.usuario;

      if (usuario.tipo === "admin") {

        navigate("/dashboard");

      } else {

        navigate("/");

      }

    } catch (error) {

      setErro(
        error.response?.data?.erro ||
        "E-mail ou senha inválidos."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="login">

      <div className="login__card">

        <div className="login__logo">

        </div>

        <h1>
          Painel Administrativo
        </h1>

        <p>
          Catálogo de Materiais ASUR
        </p>

        <form
          onSubmit={handleLogin}
          className="login__form"
        >

          <div className="login__grupo">

            <label>E-mail</label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="login__grupo">

            <label>Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />

          </div>

          {erro && (

            <div className="login__erro">

              {erro}

            </div>

          )}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Entrando..."
              : "Entrar"}

          </button>

        </form>

      </div>

    </main>

  );

}