package com.farmersmk.wallet;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class WalletController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/wallet")
    public Map<String, Object> getWallet() {
        Map<String, Object> wallet = new HashMap<>();
        wallet.put("totalValue", 1000.0);
        wallet.put("pnl", 50.0);
        List<Map<String, Object>> assets = new ArrayList<>();
        assets.add(Map.of("name", "Farmers Coin", "symbol", "FARM", "balance", 100, "value", 500.0));
        assets.add(Map.of("name", "Bitcoin", "symbol", "BTC", "balance", 0.01, "value", 500.0));
        wallet.put("assets", assets);
        return wallet;
    }
}
