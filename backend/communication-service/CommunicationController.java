package com.farmersmk.communication.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/communication")
public class CommunicationController {
    // Message endpoints
    @GetMapping("/messages")
    public List<String> getMessages() {
        return Arrays.asList("Hello!", "Welcome to the chat.");
    }

    @PostMapping("/messages")
    public String sendMessage(@RequestBody String message) {
        // Save message logic here
        return "Message sent: " + message;
    }

    // Group endpoints
    @GetMapping("/groups")
    public List<String> getGroups() {
        return Arrays.asList("General", "Developers");
    }

    @PostMapping("/groups")
    public String createGroup(@RequestBody String groupName) {
        // Create group logic here
        return "Group created: " + groupName;
    }

    // Call endpoints (stub)
    @PostMapping("/calls/start")
    public String startCall(@RequestBody String callType) {
        // Start call logic here
        return "Call started: " + callType;
    }
}
