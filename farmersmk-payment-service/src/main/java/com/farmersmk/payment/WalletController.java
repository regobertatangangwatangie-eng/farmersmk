package com.farmersmk.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    @Autowired
    private WalletService walletService;

    @PostMapping("/create")
    public ResponseEntity<?> createWallet(@RequestBody WalletCreateRequest request) {
        return walletService.createWallet(request);
    }

    // Login endpoint: returns JWT if credentials are valid
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody WalletCreateRequest request) {
        return walletService.login(request);
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody WalletTransactionRequest request, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        return walletService.deposit(request, token);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody WalletTransactionRequest request, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        return walletService.withdraw(request, token);
    }

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody WalletSendRequest request, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        return walletService.send(request, token);
    }

    @GetMapping("/balance/{email}")
    public ResponseEntity<?> getBalance(@PathVariable String email, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        return walletService.getBalance(email, token);
    }
}
