package com.example.auth.dto;

import com.example.auth.entity.Role;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Data Transfer Object for user information.
 * 
 * Used to return user data without exposing sensitive information
 * like passwords. This DTO is safe to send to the frontend.
 */
public class UserDto {
    
    private Long id;
    private String username;
    private String email;
    private Set<Role> roles;
    private LocalDateTime createdAt;
    private Boolean enabled;
    
    // Constructors
    public UserDto() {}
    
    public UserDto(Long id, String username, String email, Set<Role> roles, 
                   LocalDateTime createdAt, Boolean enabled) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.createdAt = createdAt;
        this.enabled = enabled;
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
    
    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", roles=" + roles +
                ", createdAt=" + createdAt +
                ", enabled=" + enabled +
                '}';
    }
}
