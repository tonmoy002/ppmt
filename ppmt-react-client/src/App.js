import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AddProject from './components/project/AddProject';
import {Provider} from "react-redux";
import store from './store';
import UpdateProject from './components/project/UpdateProject';
import ProjectBoard from './components/projectBoard/ProjectBoard';
import AddProjectTask from './components/projectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/projectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/layout/Landing';
import Register from './components/usermanagement/Register';
import Login from './components/usermanagement/Login';
import jwt_decode from "jwt-decode";
import setJWTToken from './securityUtiles/setJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityAction';


const jwtToken = localStorage.jwtToken;

if(jwtToken) {
  setJWTToken(jwtToken);

  const decoded_token = jwt_decode(jwtToken);

  
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_token
  });
  
  const currentTime = Date.now();

  if(decoded_token.exp < currentTime) {
    //logout action
    store.dispatch(logout);
    window.location.href= "/";
  }
}else{

  // logout
  //window.location.href = "/";
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>

          {
            // Public routes
          }

          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>

          {
             // Private routes

          }
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/addProject" component={AddProject}></Route>
          <Route exact path="/updateProject/:id" component={UpdateProject}></Route>
          <Route exact path="/projectBoard/:id" component={ProjectBoard}></Route>
          <Route exact path="/projectBoard/addProjectTask/:id" component={AddProjectTask}></Route>
          <Route exact path="/projectBoard/updateProjectTask/:backlog_id/:id" component={UpdateProjectTask}></Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
