package com.farmersmk.grants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grants")
public class GrantController {
    @Autowired
    private GrantService grantService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody GrantRegistrationRequest request) {
        return grantService.register(request);
    }

    @PostMapping("/submit-project")
    public ResponseEntity<?> submitProject(@RequestBody ProjectSubmissionRequest request) {
        return grantService.submitProject(request);
    }

    @PostMapping("/upload-video")
    public ResponseEntity<?> uploadVideo(@RequestBody VideoUploadRequest request) {
        return grantService.uploadVideo(request);
    }

    @PostMapping("/vote")
    public ResponseEntity<?> vote(@RequestBody VoteRequest request) {
        return grantService.vote(request);
    }
}
