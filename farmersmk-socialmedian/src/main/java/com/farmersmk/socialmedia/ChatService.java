package com.farmersmk.socialmedia;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

@SuppressWarnings("unchecked")

@Service
public class ChatService {
    private final Map<String, List<ChatMessage>> chatRooms = new HashMap<>();


    public ResponseEntity<?> sendMessage(ChatMessageRequest request) {
        ChatMessage msg = new ChatMessage(request.username, request.text, new Date());
        List<ChatMessage> roomMsgs = chatRooms.computeIfAbsent(request.room, k -> new ArrayList<>());
        roomMsgs.add(msg);

        // Detect agreement: message contains 'okay' and a price (e.g., 'okay 10000')
        Invoice invoice = null;
        if (request.text != null && request.text.trim().toLowerCase().startsWith("okay")) {
            // Try to extract price from message
            String[] parts = request.text.trim().split("\\s+");
            double price = 0;
            if (parts.length > 1) {
                try {
                    price = Double.parseDouble(parts[1].replaceAll("[^0-9.]", ""));
                } catch (Exception ignored) {}
            }
            // For demo: assign parties based on room and username
            String buyer = request.username;
            String farmer = "Farmer";
            String transitCompany = "TransitCo";
            String company = "FarmersMC";
            String product = request.room;
            invoice = new Invoice(buyer, farmer, transitCompany, company, product, price, new Date());
        }

        if (invoice != null) {
            Map<String, Object> result = new HashMap<>();
            result.put("message", msg);
            result.put("invoice", invoice);
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.ok(msg);
    }

    public ResponseEntity<?> getHistory(String room) {
        return ResponseEntity.ok(chatRooms.getOrDefault(room, Collections.emptyList()));
    }
}
