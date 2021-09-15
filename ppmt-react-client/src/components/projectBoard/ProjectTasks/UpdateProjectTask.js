import React, { Component } from 'react' 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjectTask, updateProjectTaskAjx } from '../../../actions/backlogAction';
import propTypes from 'prop-types';
import classname from 'classname';

class UpdateProjectTask extends Component {

    constructor() {
        super()
        this.state={

            projectSequence: "",
            status:'',
            summary:'',
            acceptanceCriteria: "",
            priority: "",
            dueDate:null,
            projectIdentifier:'',
            errors:{}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        const {
            id,
            projectSequence,
            status,
            summary,
            acceptanceCriteria,
            priority,
            dueDate,
            projectIdentifier,
            created_At

        } = nextProps.project_task;

        this.setState ({
            id,
            projectSequence,
            status,
            summary,
            acceptanceCriteria,
            priority,
            dueDate,
            projectIdentifier,
            created_At
        })
    }

    componentDidMount() {
        const {backlog_id , id} = this.props.match.params;
        this.props.getProjectTask(backlog_id, id, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const updateProjectTaskData = {
            id : this.state.id,
            projectSequence : this.state.projectSequence,
            status: this.state.status,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier:this.state.projectIdentifier,
            created_At: this.state.created_At
        }
        this.props.updateProjectTaskAjx(this.state.projectIdentifier, this.state.projectSequence, updateProjectTaskData, this.props.history);
    }
    
    render() {

        const {errors} = this.state;

        
        return (
            <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={"/Dashboard"}  className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center"> Update Project Task</h4>
                        <p className="lead text-center">Project Name : {this.state.projectIdentifier} + Project ID : {this.state.projectSequence}</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className={classname("form-control form-control-lg", {"is-invalid":errors.summary})} name="summary" placeholder="Project Task summary" 
                                value={this.state.summary} onChange={this.onChange}/>

                                {
                                    errors.summary && (
                                        <div className="invalid-feedback"> {errors.summary} </div>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"
                                value={this.state.acceptanceCriteria} onChange={this.onChange}></textarea>
                            </div>
                            <h6>Due Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" name="dueDate"
                                value={this.state.dueDate} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg" name="priority"
                                value={this.state.priority} onChange={this.onChange}>
                                    <option value={0}>Select Priority</option>
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                </select>
                            </div>
    
                            <div className="form-group">
                                <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.onChange}>
                                    <option value="">Select Status</option>
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
    
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: propTypes.func.isRequired,
    project_task: propTypes.object.isRequired,
    updateProjectTaskAjx: propTypes.func.isRequired,
    errors: propTypes.object.isRequired
}


const mapStateToProps = state=> ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectTask, updateProjectTaskAjx})(UpdateProjectTask);
