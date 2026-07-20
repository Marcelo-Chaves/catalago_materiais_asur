import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Catálogo de materiais ASUR</h2>

      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/categorias">
              Categorias
            </Link>
          </li>

          <li>
            <Link to="/produtos">
              Materiais
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}