import swal from "sweetalert";
import { createAction } from ".";
import { history } from "../../App";
import { authService } from "../../services";
import { ACCESS_TOKEN } from "../../utils/constants/config";
import { actionType } from "./type";

export const logIn = (values, callback) => {
  console.log({values})
  return async (dispatch) => {
    try {
      const res = await authService.logIn(values);
      swal("Welcome to Jira!", "Logged in successfully!", "success");

      await dispatch(createAction(actionType.SET_ME, res.data.content));

      localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
      localStorage.setItem("loginInfo", JSON.stringify(res.data.content));
      // history.push('/users')

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log({err})
      console.log(err.response?.data);
      swal("Awww!", err.response?.data?.message, "error");
    }
  };
};

export const signUp = (data, callback) => {
  return async (dispatch) => {
    try {
      await authService.signUp(data);

      swal("Successfully register!", "Please log in to continue!", "success");

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMe = async (dispatch) => {
  try {
    const res = await authService.fetchMe();

    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    const me = res.data.content.find((user) => user.userId === loginInfo.id);

    if (me === undefined) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem("loginInfo");
      window.location.reload();
      return;
    }

    dispatch(createAction(actionType.SET_ME, { ...me, id: me.userId }));
  } catch (err) {
    console.log(err);
  }
};
