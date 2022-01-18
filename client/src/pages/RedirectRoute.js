import { useAppContext } from "../context/appContext";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./Error";
import { Loading } from "../components";

const RedirectRoute = () => {
  const { shortId } = useParams();
  const [destination, setDestination] = useState(shortId);
  const { fetchSingleUrl, redirectUrl } = useAppContext();

  useEffect(() => {
    if (shortId === "landing") {
      return <Navigate to="/landing" />;
    } else if (shortId === "register") {
      return <Navigate to="/register" />;
    } else {
      redirectUrl(shortId).then((response) => {
        setDestination(response);
      });
    }
  }, [destination, shortId, redirectUrl]);
  console.log(destination);

  return destination ? <Loading center /> : <Error />;
};

export default RedirectRoute;
