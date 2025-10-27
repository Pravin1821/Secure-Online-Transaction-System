package com.example.auth.service;

import com.example.auth.dto.UserDto;
import com.example.auth.entity.Role;
import com.example.auth.entity.User;
import com.example.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

/**
 * Service class for user management operations.
 * 
 * Handles user creation, retrieval, and authentication-related operations.
 * Implements UserDetailsService for Spring Security integration.
 */
@Service
@Transactional
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Create a new user with encrypted password
     * @param username the username
     * @param email the email
     * @param password the plain text password
     * @return the created user
     */
    public User createUser(String username, String email, String password) {
        User user = new User(username, email, passwordEncoder.encode(password));
        return userRepository.save(user);
    }
    
    /**
     * Create a new user with specific roles
     * @param username the username
     * @param email the email
     * @param password the plain text password
     * @param roles the roles to assign
     * @return the created user
     */
    public User createUser(String username, String email, String password, Set<Role> roles) {
        User user = new User(username, email, passwordEncoder.encode(password));
        user.setRoles(roles);
        return userRepository.save(user);
    }
    
    /**
     * Find user by username
     * @param username the username to search for
     * @return Optional containing the user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    /**
     * Find user by email
     * @param email the email to search for
     * @return Optional containing the user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Find user by username or email
     * @param username the username to search for
     * @param email the email to search for
     * @return Optional containing the user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> findByUsernameOrEmail(String username, String email) {
        return userRepository.findByUsernameOrEmail(username, email);
    }
    
    /**
     * Check if username exists
     * @param username the username to check
     * @return true if username exists, false otherwise
     */
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    /**
     * Check if email exists
     * @param email the email to check
     * @return true if email exists, false otherwise
     */
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    /**
     * Convert User entity to UserDto
     * @param user the user entity
     * @return UserDto without sensitive information
     */
    public UserDto toDto(User user) {
        return new UserDto(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRoles(),
            user.getCreatedAt(),
            user.getEnabled()
        );
    }
    
    /**
     * Update user roles
     * @param userId the user ID
     * @param roles the new roles
     * @return the updated user
     */
    public User updateUserRoles(Long userId, Set<Role> roles) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRoles(roles);
        return userRepository.save(user);
    }
    
    /**
     * Enable or disable user
     * @param userId the user ID
     * @param enabled the enabled status
     * @return the updated user
     */
    public User updateUserStatus(Long userId, boolean enabled) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(enabled);
        return userRepository.save(user);
    }
    
    /**
     * Load user by username for Spring Security
     * @param username the username
     * @return UserDetails for authentication
     * @throws UsernameNotFoundException if user not found
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameAndEnabledTrue(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .authorities(user.getRoles().stream()
                .map(Role::getAuthority)
                .toArray(String[]::new))
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(!user.getEnabled())
            .build();
    }
}
