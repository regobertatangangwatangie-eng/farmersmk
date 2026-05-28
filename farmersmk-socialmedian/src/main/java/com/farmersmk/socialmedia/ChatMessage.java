package com.farmersmk.socialmedia;

import java.util.Date;

public class ChatMessage {
    public String username;
    public String text;
    public Date timestamp;

    public ChatMessage(String username, String text, Date timestamp) {
        this.username = username;
        this.text = text;
        this.timestamp = timestamp;
    }
}
