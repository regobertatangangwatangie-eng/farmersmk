package com.farmersmk.socialmedian.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/ads")
public class AdController {
    private static final List<Map<String, String>> ADS = Arrays.asList(
        Map.of("type", "popup", "title", "Welcome Pop-up!", "content", "Check out our new features!"),
        Map.of("type", "sponsored", "title", "Sponsored Post", "content", "Try FarmersMK premium!"),
        Map.of("type", "banner", "title", "Banner Ad", "content", "Special deals for you!"),
        Map.of("type", "promo", "title", "Promo Message", "content", "Join our community now!"),
        Map.of("type", "social", "title", "Social Media Ad", "content", "Follow us on social!"),
        Map.of("type", "targeted", "title", "Targeted Ad", "content", "You might like this offer!")
    );

    @GetMapping("/random")
    public Map<String, String> getRandomAd() {
        Random rand = new Random();
        return ADS.get(rand.nextInt(ADS.size()));
    }

    @GetMapping("")
    public List<Map<String, String>> getAllAds() {
        return ADS;
    }
}
