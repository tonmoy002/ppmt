package com.tonmoy.ppmt.web;

import com.tonmoy.ppmt.domain.Project;
import com.tonmoy.ppmt.services.MapValidationErrorService;
import com.tonmoy.ppmt.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) return errorMap;

        Project createdProject = projectService.saveOrUpdate(project, principal.getName());
        return new ResponseEntity<Project>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal) {
        Project project = projectService.findByProjectByProjectIdentifier(projectId, principal.getName());
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProject(Principal principal) {
        return projectService.findAllProjects(principal.getName());
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal) {
        projectService.deleteProjectById(projectId.toUpperCase(), principal.getName());
        return new ResponseEntity<String>("Project '"+ projectId + "' was deleted." , HttpStatus.OK);
    }


}
