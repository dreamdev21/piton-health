import * as ActionTypes from "../constants/ActionTypes";
import { AsyncStorage } from "react-native";
import * as React from "react";
import { Actions } from "react-native-router-flux";
import { API_ENDPOINT } from "../const";

const ExcersiceDifficultListHasError = message => {
  return {
    type: ActionTypes.ExcersiceDifficultList_HAS_ERROR,
    hasError: message
  };
};

const ExcersiceDifficultListIsLoading = bool => {
  return {
    type: ActionTypes.ExcersiceDifficultList_IS_LOADING,
    isLoading: bool
  };
};

const diffcultiListApi = token => {
  console.log(token);
  return dispatch => {
    fetch(`${API_ENDPOINT}/difficultylevels/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log("ExcersiceDifficultList", res);
        // if (res.status === true) {
        dispatch(ExcersiceDifficultListHasError(false));
        AsyncStorage.setItem("ExerciseDificultyList", JSON.stringify(res));
        // } else {
        //   dispatch(ExcersiceDifficultListHasError(res.msg));
        // }
      })
      .catch(e => {
        console.log(e);
        dispatch(
          ExcersiceDifficultListHasError(
            "Oops, something went wrong, server error!"
          )
        );
      });
  };
};

export default {
  ExcersiceDifficultListHasError,
  ExcersiceDifficultListIsLoading,
  diffcultiListApi
};
