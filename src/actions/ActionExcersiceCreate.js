import * as ActionTypes from "../constants/ActionTypes";
import { AsyncStorage } from "react-native";
import * as React from "react";
import { Actions } from "react-native-router-flux";
import { API_ENDPOINT } from "../const";

const ExcerciseCreateHasError = message => {
  return {
    type: ActionTypes.ExcerciseCreate_HAS_ERROR,
    hasError: message
  };
};

const ExcerciseCreateIsLoading = bool => {
  return {
    type: ActionTypes.ExcerciseCreate_IS_LOADING,
    isLoading: bool
  };
};

const ExcerciseCreateApi = (totalreps, totalsets, token) => {
  console.log(totalreps, totalsets, token);
  return dispatch => {
    fetch(`${API_ENDPOINT}/ExcersiceCreate/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        reps: totalreps,
        steps: totalsets
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === true) {
          isLoading = true;
          dispatch(ExcerciseCreateHasError(false));
        } else {
          dispatch(ExcerciseCreateHasError(res.msg));
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(
          ExcerciseCreateHasError("Oops, something went wrong, server error!")
        );
      });
  };
};

export default {
  ExcerciseCreateHasError,
  ExcerciseCreateIsLoading,
  ExcerciseCreateApi
};
