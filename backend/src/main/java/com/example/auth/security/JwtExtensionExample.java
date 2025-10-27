package com.example.auth.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * JWT Extension Example - Optional implementation for JWT-based authentication
 * 
 * This class demonstrates how to extend the current session-based authentication
 * to use JWT tokens. To use this:
 * 1. Add JWT dependencies to pom.xml
 * 2. Configure JWT properties in application.properties
 * 3. Update SecurityConfig to use JWT filter
 * 4. Update AuthController to return JWT tokens
 * 
 * Dependencies to add to pom.xml:
 * <dependency>
 *     <groupId>io.jsonwebtoken</groupId>
 *     <artifactId>jjwt-api</artifactId>
 *     <version>0.11.5</version>
 * </dependency>
 * <dependency>
 *     <groupId>io.jsonwebtoken</groupId>
 *     <artifactId>jjwt-impl</artifactId>
 *     <version>0.11.5</version>
 *     <scope>runtime</scope>
 * </dependency>
 * <dependency>
 *     <groupId>io.jsonwebtoken</groupId>
 *     <artifactId>jjwt-jackson</artifactId>
 *     <version>0.11.5</version>
 *     <scope>runtime</scope>
 * </dependency>
 */
@Component
public class JwtExtensionExample {
    
    @Value("${jwt.secret:mySecretKey}")
    private String jwtSecret;
    
    @Value("${jwt.expiration:86400000}") // 24 hours
    private int jwtExpiration;
    
    /**
     * Generate JWT token for user
     * @param username the username
     * @param roles the user roles
     * @return JWT token string
     */
    public String generateToken(String username, String[] roles) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);
        
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }
    
    /**
     * Get username from JWT token
     * @param token the JWT token
     * @return username
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    
    /**
     * Validate JWT token
     * @param token the JWT token
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    /**
     * Get signing key for JWT
     * @return SecretKey for signing
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

/**
 * JWT Filter Example - Add this to SecurityConfig
 * 
 * @Component
 * public class JwtAuthenticationFilter extends OncePerRequestFilter {
 *     
 *     @Autowired
 *     private JwtExtensionExample jwtTokenProvider;
 *     
 *     @Override
 *     protected void doFilterInternal(HttpServletRequest request, 
 *                                    HttpServletResponse response, 
 *                                    FilterChain filterChain) throws ServletException, IOException {
 *         
 *         String token = getTokenFromRequest(request);
 *         
 *         if (token != null && jwtTokenProvider.validateToken(token)) {
 *             String username = jwtTokenProvider.getUsernameFromToken(token);
 *             UserDetails userDetails = userService.loadUserByUsername(username);
 *             
 *             UsernamePasswordAuthenticationToken authentication = 
 *                 new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
 *             SecurityContextHolder.getContext().setAuthentication(authentication);
 *         }
 *         
 *         filterChain.doFilter(request, response);
 *     }
 *     
 *     private String getTokenFromRequest(HttpServletRequest request) {
 *         String bearerToken = request.getHeader("Authorization");
 *         if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
 *             return bearerToken.substring(7);
 *         }
 *         return null;
 *     }
 * }
 */

/**
 * Updated AuthController for JWT (example method)
 * 
 * @PostMapping("/login")
 * public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
 *     try {
 *         AuthResponse response = authService.login(request);
 *         String token = jwtTokenProvider.generateToken(request.getUsername(), 
 *             response.getRoles().stream().map(Role::getAuthority).toArray(String[]::new));
 *         response.setToken(token);
 *         return ResponseEntity.ok(response);
 *     } catch (RuntimeException e) {
 *         return ResponseEntity.badRequest()
 *             .body(new AuthResponse(null, null, null, null, null, null, false, e.getMessage()));
 *     }
 * }
 */
