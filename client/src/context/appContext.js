import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  FETCH_LINK,
  LOGOUT_USER,
  FETCH_LINK_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SETUP_LINK_ERROR,
  SETUP_LINK_SUCCESS,
  COPY_LINK_TO_CLIPBOARD,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  shortUrls: [],
  fullUrl: [],
  clicks: 0,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // axios

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const addUserToLocal = ({ user }) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocal = () => {
    localStorage.removeItem("user");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user } = data;
      addUserToLocal({ user });
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertText },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const fetchUrls = async () => {
    dispatch({ type: FETCH_LINK });
    try {
      const url = "/shortUrl";
      const { data } = await authFetch.get(url);
      const { shortUrls } = data;

      dispatch({
        type: FETCH_LINK_SUCCESS,
        payload: {
          shortUrls,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setupUrl = async ({ currentUrl }) => {
    try {
      await authFetch.post("/shortUrl", currentUrl);
      dispatch({
        type: SETUP_LINK_SUCCESS,
      });
      fetchUrls();
    } catch (error) {
      dispatch({
        type: SETUP_LINK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(() => {
      clearAlert();
    }, 1500);
  };

  const fetchSingleUrl = async (shortUrl) => {
    try {
      const response = await authFetch.get(`/${shortUrl}`);
      const { url } = response.data;
      return url.fullUrl;
    } catch (error) {
      console.log(error.response.data.msg);
      return false;
    }
  };

  const redirectUrl = async (shortId) => {
    await axios
      .get(`/api/v1/redirect/${shortId}`)
      .then((response) => {
        const { data } = response;
        const position = data.search("http");
        const url = data.slice(position);
        window.location.href = url;
      })
      .catch((err) => {
        if (err) {
          return null;
        }
      });
  };

  const logoutUser = async () => {
    try {
      await authFetch.get("/auth/logout");
      removeUserFromLocal();
      dispatch({
        type: LOGOUT_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    dispatch({ type: COPY_LINK_TO_CLIPBOARD });
    setTimeout(() => {
      clearAlert();
    }, 500);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        logoutUser,
        fetchUrls,
        fetchSingleUrl,
        setupUrl,
        copyToClipboard,
        redirectUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
