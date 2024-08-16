package com.example.userManagement.controller;

import com.example.userManagement.entity.User;
import com.example.userManagement.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/get-all")
    private Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping(value="/save")
    private String createUser(@RequestBody User user) {
         userService.createUser(user);
         return user.get_id();
    }

    @PutMapping(value="/edit/{id}")
    private User update(@RequestBody User user, @PathVariable(name="id")String _id) {
        user.set_id(_id);
        userService.createUser(user);
        return user;
    }

    @DeleteMapping("delete/{id}")
    private void deleteUser(@PathVariable(name="id")String _id) {
        userService.deleteUser(_id);
    }

    @RequestMapping("/user/{id}")
    private User getUser(@PathVariable(name="id")String userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/export")
    public void exportUsersToCsv(@RequestBody List<String> userIds, HttpServletResponse response) throws IOException {
        // Fetch the users based on the provided IDs
        List<User> users = userService.getAllUsersById(userIds);

        // Set response header to indicate a file download with CSV content
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=users.csv");

        // Write the CSV data to the response output stream
        userService.exportUsersToCsv(users, response.getWriter());
    }
}