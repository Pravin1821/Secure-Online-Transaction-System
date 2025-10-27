-- Initial database schema for the Secure Authentication System
-- This script creates the necessary tables for user management and authentication

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_enabled (enabled)
);

-- Create user_roles table for role-based access control
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id, role),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_role (role)
);

-- Insert default admin user (password: admin123)
-- Note: In production, this should be removed or the password should be changed
INSERT IGNORE INTO users (username, email, password, enabled) VALUES 
('admin', 'admin@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iKyVhH7M4F7J8K8K8K8K8K8K8K8K', TRUE);

-- Assign admin role to the default admin user
INSERT IGNORE INTO user_roles (user_id, role) VALUES 
((SELECT id FROM users WHERE username = 'admin'), 'ROLE_ADMIN');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username_email ON users(username, email);
CREATE INDEX IF NOT EXISTS idx_users_enabled_created ON users(enabled, created_at);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_role ON user_roles(user_id, role);
