package com.farmersmk.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class WalletService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Simulated in-memory store (replace with DB)
    private static final java.util.Map<String, String> WALLET_PASSWORDS = new java.util.concurrent.ConcurrentHashMap<>();

    public ResponseEntity<?> createWallet(WalletCreateRequest request) {
        // Input validation
        if (!StringUtils.hasText(request.getEmail()) || !request.getEmail().endsWith("@farmersmk.com") || !StringUtils.hasText(request.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
        if (WALLET_PASSWORDS.containsKey(request.getEmail())) {
            return ResponseEntity.badRequest().body("Wallet already exists");
        }
        // Hash password
        String hashed = passwordEncoder.encode(request.getPassword());
        WALLET_PASSWORDS.put(request.getEmail(), hashed);
        // TODO: Charge $1.50 and persist wallet
        return ResponseEntity.ok("Wallet created for " + request.getEmail());
    }

    // JWT login endpoint
    public ResponseEntity<?> login(WalletCreateRequest request) {
        if (!validateAndAuth(request.getEmail(), request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = JwtUtil.generateToken(request.getEmail());
        return ResponseEntity.ok(java.util.Map.of("token", token));
    }

    public ResponseEntity<?> deposit(WalletTransactionRequest request, String token) {
        String email = JwtUtil.extractEmail(sanitizeToken(token));
        if (!validateAndAuth(email, request.getPassword()) || !email.equals(request.getEmail())) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        if (request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Invalid amount");
        }
        // TODO: Charge $1 fee, update balance, log transaction
        return ResponseEntity.ok("Deposited " + request.getAmount() + " to " + request.getEmail());
    }

    public ResponseEntity<?> withdraw(WalletTransactionRequest request, String token) {
        String email = JwtUtil.extractEmail(sanitizeToken(token));
        if (!validateAndAuth(email, request.getPassword()) || !email.equals(request.getEmail())) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        if (request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Invalid amount");
        }
        // TODO: Charge $1 fee, update balance, log transaction
        return ResponseEntity.ok("Withdrew " + request.getAmount() + " from " + request.getEmail());
    }

    public ResponseEntity<?> send(WalletSendRequest request, String token) {
        String email = JwtUtil.extractEmail(sanitizeToken(token));
        if (!validateAndAuth(email, request.getPassword()) || !email.equals(request.getFromEmail())) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        if (!StringUtils.hasText(request.getToEmail()) || request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Invalid recipient or amount");
        }
        // TODO: Transfer funds, log transaction
        return ResponseEntity.ok("Sent " + request.getAmount() + " from " + request.getFromEmail() + " to " + request.getToEmail());
    }

    public ResponseEntity<?> getBalance(String email, String token) {
        String tokenEmail = JwtUtil.extractEmail(sanitizeToken(token));
        if (!tokenEmail.equals(email)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        if (!StringUtils.hasText(email) || !email.endsWith("@farmersmk.com")) {
            return ResponseEntity.badRequest().body("Invalid email");
        }
        // TODO: Implement balance retrieval, check authorization
        return ResponseEntity.ok(java.util.Map.of("usd", 0, "btc", 0, "eth", 0));
    }

    // Helper: validate email and password
    private boolean validateAndAuth(String email, String password) {
        if (!StringUtils.hasText(email) || !StringUtils.hasText(password)) return false;
        String hashed = WALLET_PASSWORDS.get(email);
        return hashed != null && passwordEncoder.matches(password, hashed);
    }

    // Helper: remove Bearer prefix if present
    private String sanitizeToken(String token) {
        if (token == null) return "";
        return token.startsWith("Bearer ") ? token.substring(7) : token;
    }
}
}
