package com.tonmoy.ppmt.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<?> handleProjectIdException(ProjectIdException ex, WebRequest request) {
        ProjectIdExceptionResponse projectIdExceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(projectIdExceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest request) {
        ProjectNotFoundExceptionRespone projectIdExceptionResponse = new ProjectNotFoundExceptionRespone(ex.getMessage());
        return new ResponseEntity<>(projectIdExceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleUserNameNotFoundException(UserAlreadyExistsException ex, WebRequest request) {
        UserAlreadyExistsResponse userAlreadyExistsResponse = new UserAlreadyExistsResponse(ex.getMessage());
        return new ResponseEntity<>(userAlreadyExistsResponse, HttpStatus.BAD_REQUEST);
    }

}
