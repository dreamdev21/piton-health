import * as ActionTypes from "../constants/ActionTypes";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { API_ENDPOINT } from "../const";

const ExcerciseListHasError = message => {
  return {
    type: ActionTypes.ExcerciseList_HAS_ERROR,
    hasError: message
  };
};

const ExcerciseListIsLoading = bool => {
  return {
    type: ActionTypes.ExcerciseList_IS_LOADING,
    isLoading: bool
  };
};

const ExcerciseListApi = token => {
  console.log(token);
  return dispatch => {
    fetch(`${API_ENDPOINT}/exerciselist/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === true) {
          dispatch(ExcerciseListHasError(false));
          AsyncStorage.setItem("ExerciseList", JSON.stringify(res.data));
        } else {
          dispatch(ExcerciseListHasError(res.msg));
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(
          ExcerciseListHasError("Oops, something went wrong, server error!")
        );
      });
  };
};

export default {
  ExcerciseListHasError,
  ExcerciseListIsLoading,
  ExcerciseListApi
};
