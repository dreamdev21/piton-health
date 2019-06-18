import * as ActionTypes from "../constants/ActionTypes";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import { API_ENDPOINT } from "../const/";
const isSignuped = bool => {
  return {
    type: ActionTypes.IS_SIGNUPED,
    isSignuped: bool
  };
};

const isResetSignuped = () => {
  return {
    type: ActionTypes.RESET_SUGNUP,
    isSignuped: false
  };
};

const signupHasError = message => {
  return {
    type: ActionTypes.SIGNUP_HAS_ERROR,
    hasError: message
  };
};

const signupIsLoading = bool => {
  return {
    type: ActionTypes.SIGNUP_IS_LOADING,
    isLoading: bool
  };
};

function resetSignUpAPI() {
  return dispatch => {
    dispatch(isSignuped(false));
  };
}

const signupAPI = (first_name, email, password) => {
  console.log(API_ENDPOINT);
  console.log(first_name, email, password);
  let formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("first_name", first_name);
  formdata.append("last_name", "");
  return dispatch => {
    dispatch(signupIsLoading(true));
    // if (name || !email || !password) {
    //     dispatch(signupHasError(true));
    //     dispatch(signupIsLoading(false));
    //     return;
    // }
    fetch(`${API_ENDPOINT}/signup/`, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(res => {
        console.log(res);
        if (res.ok === true) {
          dispatch(signupIsLoading(false));
          dispatch(signupHasError(false));
          dispatch(isSignuped(true));
          setTimeout(() => {
            dispatch(isResetSignuped());
          }, 200);
          //Alert.alert('You have successfully registered. We have sent an verification email on your email address. Please verify your email to login!', ['OK', onPress= () =>{Actions.Login()}]);
        } else {
          dispatch(signupIsLoading(false));
          setTimeout(() => {
            dispatch(signupHasError(res.message));
            dispatch(signupHasError(undefined));
          }, 100);
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(signupHasError("Oops, something went wrong, server error!"));
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
  isSignuped,
  signupHasError,
  signupIsLoading,
  signupAPI,
  resetSignUpAPI,
  logout
};
