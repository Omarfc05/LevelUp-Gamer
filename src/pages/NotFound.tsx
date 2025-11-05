import { Link } from "react-router-dom";

export const NotFound = () => {
  const h1Style: React.CSSProperties = { textShadow: "0 0 10px #39FF14" };
  const imgStyle: React.CSSProperties = { maxWidth: 320, width: "100%" };

  return (
    <main className="container text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5">
      <h1 className="display-1 fw-bold text-accent" style={h1Style}>404</h1>
      <p className="fs-3">¡Oops! Página no encontrada.</p>
      <p className="mb-4">Parece que te has perdido en el ciberespacio gamer.</p>
      <img
        src="/img/404.png"
        alt="PC Gamer perdido"
        className="img-fluid mb-4"
        style={imgStyle}
        loading="lazy"
      />
      <Link to="/" className="btn btn-accent px-4">Volver al Inicio</Link>
    </main>
  );
};
