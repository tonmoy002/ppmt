package com.tonmoy.ppmt.security;

import com.tonmoy.ppmt.domain.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.tonmoy.ppmt.security.SecurityConst.SECRECT;
import static com.tonmoy.ppmt.security.SecurityConst.TOKEN_EXPIRATION;

@Component
public class JwtTokenProvider {
    // generate the token
    public String generateToken(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime() + TOKEN_EXPIRATION);

        String userID = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userID);
        claims.put("username", user.getUsername());
        claims.put("fullname", user.getFullname());

        return Jwts.builder().setSubject(userID)
                .addClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRECT)
                .compact();

    }

    // validate the token
    public boolean validateToken(String token) {
        try{
            Jwts.parser().setSigningKey(SECRECT).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex) {
            System.out.println("Invalid signature");
        }catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        }catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        }catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT exception");
        }catch(IllegalArgumentException ex) {
            System.out.println("JWT claims sting is empty");
        }

        return false;
    }


    // get user ID from token
    public Long getUserId(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRECT).parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");

        return Long.parseLong(id);
    }

}
