package com.example.userManagement.repository;

import com.example.userManagement.model.User;
import com.example.userManagement.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}