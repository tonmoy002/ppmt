import React, { Component } from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {createProject} from "../../actions/projectAction"
import classname from "classname"

class AddProject extends Component {

    constructor() {
        super()
        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState( {[e.target.name]:e.target.value } );
    }
    //lifecycle of hooks
    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }


    onSubmit(e) {
        e.preventDefault();
        const newProject = {
            "projectName": this.state.projectName,
            "projectIdentifier": this.state.projectIdentifier,
            "description": this.state.description,
            "startDate": this.state.startDate,
            "endDate": this.state.endDate,
        }
        this.props.createProject(newProject, this.props.history)
        
    }
    render() {
        const {errors} = this.state;

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classname("form-control form-control-lg ", {
                                        "is-invalid": errors.projectName
                                    })}
                                        placeholder="Project Name" name="projectName" 
                                        value={this.state.projectName} onChange={this.onChange}/>

                                    {errors.projectName && (
                                        <div className="invalid-feedback"> {errors.projectName}</div>
                                    )}    
                                </div>
                                <div className="form-group">
                                    <input type="text" className={classname("form-control form-control-lg ", {
                                        "is-invalid": errors.projectIdentifier
                                    })}
                                    placeholder="Unique Project ID" name="projectIdentifier" value={this.state.projectIdentifier} onChange={this.onChange}/>
                                    
                                    {errors.projectIdentifier && (
                                        <div className="invalid-feedback"> {errors.projectIdentifier}</div>
                                    )}   
                                </div>
                            
                                <div className="form-group">
                                    <textarea className={classname("form-control form-control-lg ", {
                                        "is-invalid": errors.description
                                    })}
                                    placeholder="Project Description" name="description" value={this.state.description} onChange={this.onChange}></textarea>
                                    {errors.description && (
                                        <div className="invalid-feedback"> {errors.description}</div>
                                    )}   
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className={classname("form-control form-control-lg ", {
                                        "is-invalid": errors.startDate
                                    })}
                                    name="start_date" name="startDate" value={this.state.startDate} onChange={this.onChange}/>
                                    {errors.startDate && (
                                        <div className="invalid-feedback"> {errors.startDate}</div>
                                    )}   
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className={classname("form-control form-control-lg ", {
                                        "is-invalid": errors.endDate
                                    })} 
                                    name="end_date" name="endDate" value={this.state.endDate} onChange={this.onChange}/>
                                    {errors.endDate && (
                                        <div className="invalid-feedback"> {errors.endDate}</div>
                                    )}   
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

AddProject.propTypes = {
    createProject : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
   errors: state.errors
});

export default connect(mapStateToProps, {createProject}) (AddProject);