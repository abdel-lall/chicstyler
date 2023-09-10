import { combineReducers } from "redux";
import authReducer from "./authSlice"; // Import your auth slice
import ProductsReducer from "./productsSlice";
import OredersReducer from "./orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: ProductsReducer,
  orders: OredersReducer,
});

export default rootReducer;
