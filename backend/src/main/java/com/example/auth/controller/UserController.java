package com.example.auth.controller;

import com.example.auth.dto.AuthResponse;
import com.example.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for user-related endpoints.
 * 
 * Handles operations that require authentication.
 * All endpoints are protected and require valid authentication.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {
    
    @Autowired
    private AuthService authService;
    
    /**
     * Get current authenticated user information
     * @return ResponseEntity with user information
     */
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            AuthResponse response = authService.getCurrentUser(username);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponse(null, null, null, null, null, null, false, e.getMessage()));
        }
    }
}
