import {combineReducers} from "redux";
import backlogReducers from "./backlogReducers";
import errorReducers from "./errorReducers";
import projectReducer from "./projectReducer";

export default combineReducers({

    errors : errorReducers,
    project: projectReducer,
    backlog: backlogReducers
});
