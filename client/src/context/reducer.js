import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  SETUP_LINK_BEGIN,
  SETUP_LINK_ERROR,
  SETUP_LINK_SUCCESS,
  LOGOUT_USER,
  FETCH_LINK,
  FETCH_LINK_SUCCESS,
  COPY_LINK_TO_CLIPBOARD,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };

    case SETUP_USER_BEGIN:
      return { ...state, isLoading: true };

    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: true,
        token: action.payload.token,
        user: action.payload.user,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };

    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
      };

    case FETCH_LINK:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shortUrls: action.payload.shortUrls,
        shortParams: action.payload.shortParams,
      };

    case SETUP_LINK_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case SETUP_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "New URL Shortened",
      };

    case SETUP_LINK_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case COPY_LINK_TO_CLIPBOARD:
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "URL Coppied to Clipboard",
      };
    default:
      throw new Error(`no such action : ${action.type}`);
  }
};

export default reducer;
