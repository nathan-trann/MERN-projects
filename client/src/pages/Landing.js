import { LandingPage, Logo } from "../components";
import landing from "../assets/landing.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <LandingPage>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            URL <span>shortener</span> app
          </h1>
          <p>
            A URL shortener built with powerful tools to help you grow and
            protect your brand.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={landing} alt="url shortener" className="img main-img" />
      </div>
    </LandingPage>
  );
};

export default Landing;
