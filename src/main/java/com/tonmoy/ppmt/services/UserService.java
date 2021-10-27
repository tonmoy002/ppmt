package com.tonmoy.ppmt.services;

import com.tonmoy.ppmt.domain.User;
import com.tonmoy.ppmt.exceptions.UserAlreadyExistsException;
import com.tonmoy.ppmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {


        // username needs to be unique
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        }catch (Exception ex) {
            throw new UserAlreadyExistsException("User "+ newUser.getUsername() + " already exists.");
        }
        // password and confirm password match
        // make sure not persist confirmPassowrd

    }


}
