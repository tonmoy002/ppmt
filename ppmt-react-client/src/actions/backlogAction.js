 import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK, GET_API_URL } from "./types";


export const addProjectTask = (backlog_id, project_task, history) => async dispatch =>{

    try{
        await axios.post(`${GET_API_URL}api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);

        dispatch({
            type: GET_ERRORS,
            payload: {}
        })

    } catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getBacklog = backlog_id => async dispatch => {
    try{

        const res = await axios.get(`${GET_API_URL}api/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })
    }catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProjectTask = (backlog_id, pt_id, history) => async dispatch =>{

    try{
        const res = await axios.get(`${GET_API_URL}api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        })

    }catch(err) {
        history.push("/dashboard")
    }

}

export const updateProjectTaskAjx = (backlog_id, pt_id, project_task, history) => async dispatch =>{

    try{
        await axios.patch(`${GET_API_URL}api/backlog/${backlog_id}/${pt_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);

        dispatch({
            type: GET_ERRORS,
            payload: {}
        })

    } catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const deleteProjectTask = (backlog_id, pt_id) => async dispatch => {

    if(window.confirm("Are you sure to delete?")) {
        await axios.delete(`${GET_API_URL}api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        })
    }
    
}