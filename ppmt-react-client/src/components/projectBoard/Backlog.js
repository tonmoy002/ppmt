import React, { Component } from 'react'
import ProjectTask from './ProjectTasks/ProjectTask'

class Backlog extends Component {


    render() {
    
        const { project_tasks_props } =  this.props;

        const project_tasks = project_tasks_props.map(project_task=> (
            <ProjectTask key={project_task.id} project_task={project_task}></ProjectTask>
        ));

        let todoTasks = [];
        let inProgressTasks = [];
        let doneTasks = [];

        for(let i=0; i<project_tasks.length; i++) {
            
            if(project_tasks[i].props.project_task.status === "TO_DO") {
                todoTasks.push(project_tasks[i])
            }else if(project_tasks[i].props.project_task.status === "IN_PROGRESS") {
                inProgressTasks.push(project_tasks[i])
            }else if(project_tasks[i].props.project_task.status === "DONE") {
                doneTasks.push(project_tasks[i])
            }
        }


        return (
            <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {todoTasks}
                </div>
                
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {inProgressTasks}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {doneTasks}

                </div>
            </div>
        </div>
        )
    }
}

export default Backlog;
