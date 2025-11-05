package com.sk.backend.controller;

import com.sk.backend.dto.TransactionRequestDTO;
import com.sk.backend.dto.TransactionResponseDTO;
import com.sk.backend.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class TransactionController {

    public final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getdetails(){
        List<TransactionResponseDTO> list = transactionService.getDetails();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping("/register")
    public ResponseEntity<TransactionResponseDTO> register(@Valid @RequestBody TransactionRequestDTO transactionRequestDTO){
        TransactionResponseDTO transactionResponseDTO=transactionService.createAccount(transactionRequestDTO);
        return ResponseEntity.ok().body(transactionResponseDTO);
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<TransactionResponseDTO> update(
            @PathVariable String username,
            @Valid @RequestBody TransactionRequestDTO dto) {
        TransactionResponseDTO updated = transactionService.updateAccountByUsername(username, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> delete(@PathVariable String username) {
        transactionService.deleteAccountByUsername(username);
        return ResponseEntity.ok("Account deleted successfully for username: " + username);
    }
}
