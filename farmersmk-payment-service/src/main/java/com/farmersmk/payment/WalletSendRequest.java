package com.farmersmk.payment;

public class WalletSendRequest {
    private String fromEmail;
    private String password;
    private String toEmail;
    private double amount;
    // getters and setters
    public String getFromEmail() { return fromEmail; }
    public void setFromEmail(String fromEmail) { this.fromEmail = fromEmail; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getToEmail() { return toEmail; }
    public void setToEmail(String toEmail) { this.toEmail = toEmail; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
