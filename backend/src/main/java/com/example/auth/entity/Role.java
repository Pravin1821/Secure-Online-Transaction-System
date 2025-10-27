package com.example.auth.entity;

/**
 * Enumeration representing user roles in the system.
 * 
 * This enum provides a simple role-based access control system
 * that can be extended for more complex authorization needs.
 */
public enum Role {
    /**
     * Standard user role with basic permissions
     */
    USER("ROLE_USER"),
    
    /**
     * Administrator role with elevated permissions
     */
    ADMIN("ROLE_ADMIN"),
    
    /**
     * Moderator role with content management permissions
     */
    MODERATOR("ROLE_MODERATOR");
    
    private final String authority;
    
    Role(String authority) {
        this.authority = authority;
    }
    
    public String getAuthority() {
        return authority;
    }
    
    /**
     * Get role from authority string
     * @param authority the authority string
     * @return the corresponding Role enum
     */
    public static Role fromAuthority(String authority) {
        for (Role role : Role.values()) {
            if (role.getAuthority().equals(authority)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown authority: " + authority);
    }
}
