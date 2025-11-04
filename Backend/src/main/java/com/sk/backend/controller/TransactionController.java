package com.sk.backend.controller;

import com.sk.backend.dto.TransactionResponseDTO;
import com.sk.backend.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
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
}
