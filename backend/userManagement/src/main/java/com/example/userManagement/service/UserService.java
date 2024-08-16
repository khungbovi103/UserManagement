package com.example.userManagement.service;

import com.example.userManagement.entity.User;
import com.example.userManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers() {
         return userRepository.findAll();
    }

    public List<User> getAllUsersById(List<String> ids) {
         return userRepository.findAllById(ids);
    }

    public void createUser(User user) {
         userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).get();
    }

    public void exportUsersToCsv(List<User> users, PrintWriter writer) {
        writer.write("_id,email,firstName,lastName\n");

        for (User user : users) {
            writer.write(String.format("%s,%s,%s,%s\n",
                    user.get_id(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName()));
        }
}}