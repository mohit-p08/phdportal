import ACTIONS from "../actions/";

const initialState = {
  finalData: {},
  isLogged: false,
  // isAdmin: false,
  // isDean: false,
  // isAccountant: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      console.log(action.payload);
      return {
        ...state,
        finalData: action.payload.finalData,
        // isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer;
