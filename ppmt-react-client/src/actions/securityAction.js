import axios from "axios";
import setJWTToken from "../securityUtiles/setJWTToken";
import { GET_ERRORS, SET_CURRENT_USER, GET_API_URL } from "./types";
import jwt_decode from "jwt-decode"


export const createNewUser = (newUser, history) => async dispatch => {

    try {
        await axios.post(`${GET_API_URL}api/users/register`, newUser);

        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })

    }catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }

};

export const login = LoginRequest => async dispatch => {
    try {
      // post => Login Request
      const res = await axios.post(`${GET_API_URL}api/users/login`, LoginRequest);
      // extract token from res.data
      const { token } = res.data;

      // store the token in the localStorage
      localStorage.setItem("jwtToken", token);
      
      // set our token in header ***
      setJWTToken(token);
      
      // decode token on React
      const decoded = jwt_decode(token);
      
      // dispatch to our securityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };


  export const logout = () => async dispatch => {
      localStorage.removeItem("jwtToken");
      setJWTToken(false)

      
  }