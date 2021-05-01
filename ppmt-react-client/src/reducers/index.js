import {combineReducers} from "redux";
import errorReducers from "./errorReducers";
import projectReducer from "./projectReducer";

export default combineReducers({

    errors : errorReducers,
    project: projectReducer
});
