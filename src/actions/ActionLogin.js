import * as ActionTypes from "../constants/ActionTypes";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import { API_ENDPOINT } from "../const";
import ActionDifficulty from "./ActionDifficulty";

const isLogged = bool => {
  return {
    type: ActionTypes.IS_LOGGED,
    isLogged: bool
  };
};

const loginHasError = message => {
  return {
    type: ActionTypes.LOGIN_HAS_ERROR,
    hasError: message
  };
};

const loginIsLoading = bool => {
  return {
    type: ActionTypes.LOGIN_IS_LOADING,
    isLoading: bool
  };
};
const loginData = logindata => {
  return {
    type: ActionTypes.LOGIN_DATA,
    loggedData: logindata
  };
};
const checkDiff = () => {
  const status = AsyncStorage.getItem("difficulty");
  console.log("Actionlogin", status);
  if (status === "" || status === "null" || status === null) {
    // isLoading:true
    //this.setState({isWaiting:false})

    Actions.Level();
  } else {
    // this.setState({isWaiting:false})

    Actions.Home();
  }
};

const loginApi = (email, password) => {
  //Actions.Spinner(true)
  console.log(email, password);
  let formdata = new FormData();
  formdata.append("username", email);
  formdata.append("password", password);
  return dispatch => {
    dispatch(loginIsLoading(true));
    // if (!email || !password) {
    //     dispatch(loginHasError(true));
    //     dispatch(loginIsLoading(false));
    //     return;
    // }
    fetch(`${API_ENDPOINT}/login/`, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        if (res.status === true) {
          //Actions.Spinner(false)
          dispatch(loginIsLoading(false));
          dispatch(loginHasError(false));
          dispatch(isLogged(true));
          AsyncStorage.setItem("first_name", res.data.first_name);
          AsyncStorage.setItem("difficulty", String(res.data.dificulty));
          AsyncStorage.setItem("token", res.token);
        } else {
          dispatch(loginIsLoading(false));
          setTimeout(() => {
            dispatch(loginHasError(res.message));
            dispatch(loginHasError(undefined));
          }, 1000);
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(loginHasError("Oops, something went wrong, server error!"));
      });
  };
};

const logout = () => {
  AsyncStorage.removeItem("token");
  Actions.Login();
  return {
    type: ActionTypes.LOGOUT
  };
};

export default {
  isLogged,
  loginHasError,
  loginIsLoading,
  loginApi,
  logout,
  loginData
};
