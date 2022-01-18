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
    fetchSingleUrl(shortId).then((response) => {
      setDestination(response);
    });
  }, [fetchSingleUrl, shortId]);

  useEffect(() => {
    if (!destination) {
      return;
    }
    redirectUrl(shortId);
  }, [destination, shortId, redirectUrl]);

  if (shortId === "landing") {
    return <Navigate to="/landing" />;
  }

  if (shortId === "register") {
    return <Navigate to="/register" />;
  }

  return destination ? <Loading center /> : <Error />;
};

export default RedirectRoute;
