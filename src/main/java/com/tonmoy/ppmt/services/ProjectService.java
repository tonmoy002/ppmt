package com.tonmoy.ppmt.services;

import com.tonmoy.ppmt.domain.Project;
import com.tonmoy.ppmt.exceptions.ProjectIdException;
import com.tonmoy.ppmt.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdate(Project project) {
        try{
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' was already created");
        }
    }

    public Project findByProjectByProjectIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null) {
            throw new ProjectIdException("Project ID '"+projectId.toUpperCase()+"' does not exit");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectById(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        if(project == null ){
            throw new ProjectIdException("Project ID '"+projectId.toUpperCase()+"' does not exit");
        }
        projectRepository.delete(project);
    }
}
