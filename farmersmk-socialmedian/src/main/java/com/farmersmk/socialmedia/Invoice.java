package com.farmersmk.socialmedia;

import java.util.Date;

public class Invoice {
    public String buyer;
    public String farmer;
    public String transitCompany;
    public String company;
    public String product;
    public double price;
    public Date timestamp;

    public Invoice(String buyer, String farmer, String transitCompany, String company, String product, double price, Date timestamp) {
        this.buyer = buyer;
        this.farmer = farmer;
        this.transitCompany = transitCompany;
        this.company = company;
        this.product = product;
        this.price = price;
        this.timestamp = timestamp;
    }
}