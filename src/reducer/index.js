import { combineReducers } from "redux";
import { mainExpenseReducer } from "./mainexpensecategory";
import {currentStateDataReducer} from './CurrentData'

export default combineReducers({
  mainExpenseByCategory: mainExpenseReducer,
  currentStateData:currentStateDataReducer,
});
