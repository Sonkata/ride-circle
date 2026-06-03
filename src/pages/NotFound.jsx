import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page-section">
      <p className="eyebrow">404</p>
      <h1>Road not found.</h1>

      <p className="page-text">
        Looks like this route does not exist.
      </p>

      <Link to="/" className="btn primary-btn">
        Back Home
      </Link>
    </section>
  );
}

export default NotFound;