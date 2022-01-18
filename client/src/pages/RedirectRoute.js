import { useAppContext } from "../context/appContext";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./Error";
import { Loading } from "../components";

const RedirectRoute = () => {
  const { shortId } = useParams();
  const [destination, setDestination] = useState(shortId);
  const { fetchSingleUrl, redirectUrl } = useAppContext();

  // useEffect(() => {
  //   fetchSingleUrl(shortId).then((response) => {
  //     setDestination(response);
  //   });
  // }, [fetchSingleUrl, shortId]);

  useEffect(() => {
    if (shortId === "landing") {
      return <Navigate to="/landing" />;
    } else if (shortId === "register") {
      return <Navigate to="/register" />;
    } else {
      redirectUrl(shortId).then((response) => {
        console.log(response);
      });
    }
  }, [destination, shortId, redirectUrl]);

  // useEffect(() => {
  //   window.location.href = destination;
  // });

  return destination ? <Loading center /> : <Error />;
};

export default RedirectRoute;
