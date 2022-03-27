package com.tonmoy.ppmt.services;

import com.tonmoy.ppmt.domain.Backlog;
import com.tonmoy.ppmt.domain.Project;
import com.tonmoy.ppmt.domain.User;
import com.tonmoy.ppmt.exceptions.ProjectIdException;
import com.tonmoy.ppmt.exceptions.ProjectNotFoundException;
import com.tonmoy.ppmt.repositories.BacklogRepository;
import com.tonmoy.ppmt.repositories.ProjectRepository;
import com.tonmoy.ppmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdate(Project project, String userName) {
        try{

            User user = userRepository.findByUsername(userName);
            project.setUser(user);
            project.setProjectLeader(userName);

            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if(project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            } else if(project.getId() != null){
                Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase());
                if(!project.getProjectLeader().equals(userName)) {
                    throw new ProjectNotFoundException("This project + '" +project.getProjectName()+"' does not available in your account");
                }
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);

        }catch (Exception e){
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' was already created");
        }
    }

    public Project findByProjectByProjectIdentifier(String projectId, String username) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null) {
            throw new ProjectIdException("Project ID '"+projectId.toUpperCase()+"' does not exit");
        }else if(!project.getProjectLeader().equals(username) ){
            throw new ProjectIdException("Project Id "+ projectId.toUpperCase() + "'does not created by " + username);
        }


        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectById(String projectId, String username) {

        Project project = findByProjectByProjectIdentifier(projectId, username);
        projectRepository.delete(project);
    }
}
