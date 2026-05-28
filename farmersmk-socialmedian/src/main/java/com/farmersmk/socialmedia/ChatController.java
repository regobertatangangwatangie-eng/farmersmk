package com.farmersmk.socialmedia;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessageRequest request) {
        return chatService.sendMessage(request);
    }

    @GetMapping("/history/{room}")
    public ResponseEntity<?> getHistory(@PathVariable String room) {
        return chatService.getHistory(room);
    }
}
