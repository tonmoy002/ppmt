import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Backlog from './Backlog';
import { connect } from 'react-redux';
import { getBacklog } from '../../actions/backlogAction';
import propTypes from "prop-types";

class ProjectBoard extends Component {
    
    // constructor to handle errors

    constructor() {
        super();
        this.state = {
            errors: {}
        }
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    render() {
        
        const { id } = this.props.match.params;
        const {project_tasks} = this.props.backlog;

        const {errors}  = this.state;

        let boardContent ;
        const boardAlgorith = (errors, project_tasks) => {
            if(project_tasks.length < 1) {
                if(errors.projectNotFound ) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">{errors.projectNotFound}</div>
                    )
                }else {
                    return (
                        <div className="alert alert-info text-center" role="alert">No project task found.</div>
                    )
                }
            }else {
                return (
                    <Backlog project_tasks_props= {project_tasks}></Backlog>
                )
            }
        }

        boardContent = boardAlgorith(errors, project_tasks);
        return (
            <div className="container">
                <Link to={'addProjectTask/'+id} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {boardContent}
                
            </div>
        )
    }
}

ProjectBoard.propTypes = {
    backlog: propTypes.object.isRequired,
    getBacklog : propTypes.func.isRequired,
    errors: propTypes.object.isRequired

}

const mapStateToProps = state => ({

    backlog : state.backlog,
    errors: state.errors
})


export default  connect(mapStateToProps, {getBacklog})(ProjectBoard);