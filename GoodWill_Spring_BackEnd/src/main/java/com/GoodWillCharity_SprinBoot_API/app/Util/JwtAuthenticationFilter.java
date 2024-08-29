//package com.GoodWillCharity_SprinBoot_API.app.Util;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.util.ArrayList;
//
//public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
//
//    private final UserDetailsService userDetailsService;
//    private final String secretKey;
//
//    public JwtAuthenticationFilter(UserDetailsService userDetailsService, String secretKey) {
//        super(null);
//        this.userDetailsService = userDetailsService;
//        this.secretKey = secretKey;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//        String header = request.getHeader("Authorization");
//
//        if (header == null || !header.startsWith("Bearer ")) {
//            chain.doFilter(request, response);
//            return;
//        }
//
//        UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        chain.doFilter(request, response);
//    }
//
//    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
//        String token = request.getHeader("Authorization");
//
//        if (token != null) {
//            // Parse the token
//            Claims claims = Jwts.parserBuilder()
//                    .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)))
//                    .build()
//                    .parseClaimsJws(token.replace("Bearer ", ""))
//                    .getBody();
//
//            String userId = claims.get("UserId", String.class);
//            String userRole = claims.get("UserRole", String.class);
//
//            if (userId != null) {
//                UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
//                return new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayList<>());
//            }
//            return null;
//        }
//        return null;
//    }
//}
