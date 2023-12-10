package com.twinkle.shopapp.controllers;
import com.twinkle.shopapp.models.Category;
import com.twinkle.shopapp.services.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.boot.actuate.health.Health;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.net.InetAddress;

@RestController
@RequestMapping("${api.prefix}/healthcheck")
@AllArgsConstructor
public class HealthCheckController {
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        // Perform additional health checks here
        try {
            String computerName = InetAddress.getLocalHost().getHostName();
            return ResponseEntity.ok(Health.up().withDetail("computerName", computerName).build()); //code: 200
            //DOWN => 503
        } catch (Exception e) {
            //throw new RuntimeException(e);
            return ResponseEntity.badRequest().body(Health.down()
                    .withDetail("Error", e.getMessage()).build());
        }
    }
}
