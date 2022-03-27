package com.tonmoy.ppmt.exceptions;

public class ProjectNotFoundExceptionRespone {

    private String projectNotFound;

    public ProjectNotFoundExceptionRespone(String projectNotFound) {
        this.projectNotFound = projectNotFound;
    }

    public String getProjectNotFound() {
        return projectNotFound;
    }

    public void setProjectNotFound(String projectNotFound) {
        this.projectNotFound = projectNotFound;
    }
}
