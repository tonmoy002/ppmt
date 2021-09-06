package com.tonmoy.ppmt.services;

import com.tonmoy.ppmt.domain.Backlog;
import com.tonmoy.ppmt.domain.Project;
import com.tonmoy.ppmt.domain.ProjectTask;
import com.tonmoy.ppmt.exceptions.ProjectNotFoundException;
import com.tonmoy.ppmt.repositories.BacklogRepository;
import com.tonmoy.ppmt.repositories.ProjectRepository;
import com.tonmoy.ppmt.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        try{
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);

            Integer backlogSequence = backlog.getPTSequence();
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);

            projectTask.setProjectSequence(projectIdentifier+"-"+ backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if(projectTask.getPriority() == null) { //projectTask.getPriority() == 0 ||  to handle o from frontend
                projectTask.setPriority(3);
            }

            if(projectTask.getStatus() == "" || projectTask.getStatus() == null ) {
                projectTask.setStatus("TODO");
            }

            return projectTaskRepository.save(projectTask);
        }catch (Exception e) {

            throw new ProjectNotFoundException("Project not found");
        }


    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        Project project = projectRepository.findByProjectIdentifier(id);

        if(project == null) {
            throw new ProjectNotFoundException("Project with ID: '"+ id + "'does not exist.");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
        if(backlog == null) {
            throw new ProjectNotFoundException("Project with id:'"+ backlog_id +"'does not exist");
        }
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask == null) {
            throw new ProjectNotFoundException("Project task id:'"+ pt_id +"'does not exist");
        }

        /*if(projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project task "+ pt_id+" doesnot exist");
        }*/
        return projectTask;
    }

    public ProjectTask updateProjectTask(ProjectTask updatedProjectTask, String backlog_id, String pt_id) {

        ProjectTask pt = findPTByProjectSequence(backlog_id, pt_id);
        pt = updatedProjectTask;
        return projectTaskRepository.save(pt);
    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id) {
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id);
        projectTaskRepository.delete(projectTask);
    }



}
