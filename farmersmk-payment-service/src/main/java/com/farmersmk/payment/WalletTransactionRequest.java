package com.farmersmk.payment;

public class WalletTransactionRequest {
    private String email;
    private String password;
    private double amount;
    // getters and setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
