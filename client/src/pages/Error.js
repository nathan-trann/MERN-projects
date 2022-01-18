import { Link } from "react-router-dom";
import img from "../assets/not-found.svg";
import { ErrorPage } from "../components";

const Error = () => {
  return (
    <ErrorPage className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </ErrorPage>
  );
};

export default Error;
