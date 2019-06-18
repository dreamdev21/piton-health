import * as ActionTypes from "../constants/ActionTypes";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import { API_ENDPOINT } from "../const";

const updateDiffHasError = message => {
  return {
    type: ActionTypes.UPDATE_DIFF_HAS_ERROR,
    hasError: message
  };
};

const updateDiffIsLoading = bool => {
  return {
    type: ActionTypes.UPdate_DIFF_IS_LOADING,
    isLoading: bool
  };
};

const updateDifficultyApi = (difficulty, token, userId) => {
  console.log(difficulty);
  return dispatch => {
    fetch(`${API_ENDPOINT}/users/${userId}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        dificulty: difficulty
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === true) {
          dispatch(updateDiffHasError(false));
          Actions.Home();
        } else {
          dispatch(updateDiffHasError(res.msg));
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(
          updateDiffHasError("Oops, something went wrong, server error!")
        );
      });
  };
};

export default {
  updateDiffHasError,
  updateDiffIsLoading,
  updateDifficultyApi
};
