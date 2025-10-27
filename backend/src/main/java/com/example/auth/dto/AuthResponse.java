package com.example.auth.dto;

import com.example.auth.entity.Role;
import com.example.auth.entity.User;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Data Transfer Object for authentication responses.
 * 
 * Contains user information returned after successful login
 * without exposing sensitive data like passwords.
 */
public class AuthResponse {
    
    private Long id;
    private String username;
    private String email;
    private Set<Role> roles;
    private LocalDateTime createdAt;
    private Boolean enabled;
    private String message;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(User user, String message) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.roles = user.getRoles();
        this.createdAt = user.getCreatedAt();
        this.enabled = user.getEnabled();
        this.message = message;
    }
    
    public AuthResponse(Long id, String username, String email, Set<Role> roles, 
                       LocalDateTime createdAt, Boolean enabled, String message) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.createdAt = createdAt;
        this.enabled = enabled;
        this.message = message;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Set<Role> getRoles() {
        return roles;
    }
    
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public Boolean getEnabled() {
        return enabled;
    }
    
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    @Override
    public String toString() {
        return "AuthResponse{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", roles=" + roles +
                ", createdAt=" + createdAt +
                ", enabled=" + enabled +
                ", message='" + message + '\'' +
                '}';
    }
}
