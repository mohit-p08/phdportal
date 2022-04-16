import axios from "axios";
import ACTIONS from "./index";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchApplication = async (token) => {
  const res = await axios.get("/application/myapplication", {
    headers: { Authorization: token },
  });
  // console.log(res);
  return res;
};

export const disptachGetApplication = async (res) => {
  return {
    type: ACTIONS.GET_APPLICATION,
    payload: {
      user: res.data,
      // isDean: res.data.role === 1 ? true : false,
      // isAdmin: res.data.role === 2 ? true : false,
    },
  };
};
