package com.example.auth.service;

import com.example.auth.dto.AuthResponse;
import com.example.auth.dto.LoginRequest;
import com.example.auth.dto.RegisterRequest;
import com.example.auth.entity.Role;
import com.example.auth.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for authentication operations.
 * 
 * Handles user registration, login, and authentication-related business logic.
 * Integrates with Spring Security for authentication management.
 */
@Service
@Transactional
public class AuthService {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    /**
     * Register a new user
     * @param request the registration request
     * @return AuthResponse with user information
     * @throws RuntimeException if registration fails
     */
    public AuthResponse register(RegisterRequest request) {
        // Validate password confirmation
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        
        // Check if username already exists
        if (userService.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }
        
        // Check if email already exists
        if (userService.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        
        // Create new user
        User user = userService.createUser(
            request.getUsername(),
            request.getEmail(),
            request.getPassword()
        );
        
        return new AuthResponse(user, "User registered successfully");
    }
    
    /**
     * Authenticate user login
     * @param request the login request
     * @return AuthResponse with user information
     * @throws RuntimeException if authentication fails
     */
    public AuthResponse login(LoginRequest request) {
        try {
            // Authenticate user with Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
            
            // Get user details
            User user = userService.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            return new AuthResponse(user, "Login successful");
            
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }
    
    /**
     * Get current user information
     * @param username the username
     * @return AuthResponse with user information
     */
    public AuthResponse getCurrentUser(String username) {
        User user = userService.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return new AuthResponse(user, "User information retrieved");
    }
    
    /**
     * Validate registration request
     * @param request the registration request
     * @throws RuntimeException if validation fails
     */
    public void validateRegistration(RegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        
        if (request.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }
        
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
    }
}
