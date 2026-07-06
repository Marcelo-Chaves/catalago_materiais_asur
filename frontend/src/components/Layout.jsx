import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  children
}) {
  return (
    <div className="container">

      <Sidebar />

      <main className="content">

        <Header />

        {children}

      </main>

    </div>
  );
}