import React, { Component } from 'react'
import CreateProjectButton from './project/CreateProjectButton';
import ProjectItem from './project/ProjectItem';
import {connect} from "react-redux";
import {getProjects} from "../actions/projectAction"
import Proptypes from "prop-types";

class Dashboard extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    render() {

        const projects = this.props.project.projects;
        /*const project = {
            projectName: "Name of project",
            projectIdentifier : "react",
            description: " description of project"
        }*/
        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <CreateProjectButton/>
                            <br />
                            <hr />
                            {projects.map((project, index) => (
                                    <ProjectItem key={project.id} project={project} />
                                ))
                            }
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    project : Proptypes.object.isRequired,
    getProjects : Proptypes.func.isRequired
}

const mapStateToProps = state => ({
    project : state.project
});

export default connect( mapStateToProps, {getProjects}) (Dashboard);
