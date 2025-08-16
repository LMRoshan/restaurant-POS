export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((e) => e._id !== action.payload),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((e) =>
          e._id === action.payload.id ? { ...e, qty: action.payload.qty } : e
        ),
      };
    default:
      return state;
  }
};
