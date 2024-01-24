const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
  isLoading: false,
}

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      }
    case "customer/updateName":
      return { ...state, fullName: action.payload }

    default:
      return state
  }
}

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      // no side-effects in reducer, so we calculate
      // the date here:
      createdAt: new Date().toISOString(),
    },
  }
}

export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  }
}
