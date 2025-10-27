package com.example.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot application class for the Secure Authentication System.
 * 
 * This application provides a complete authentication system with:
 * - User registration and login
 * - Password encryption using BCrypt
 * - Spring Security integration
 * - RESTful API endpoints
 * - MySQL database integration
 */
@SpringBootApplication
public class AuthSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthSystemApplication.class, args);
    }
}
