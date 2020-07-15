const init = { firstName: "" };

export let rootReducer = (state = init, action) => {
  switch (action.type) {
    case "ADD_ENTRY": {
      return { ...state, firstName: action.firstName };
    }
    default: {
      return state;
    }
  }
};
