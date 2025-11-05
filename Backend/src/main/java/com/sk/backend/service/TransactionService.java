package com.sk.backend.service;

import com.sk.backend.dto.TransactionRequestDTO;
import com.sk.backend.dto.TransactionResponseDTO;
import com.sk.backend.mapper.TransactionMapper;
import com.sk.backend.model.TransactionModel;
import com.sk.backend.repository.TransactionRepository;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TransactionService {


    private final PasswordEncoder passwordEncoder;
    private TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository, ListableBeanFactory listableBeanFactory, PasswordEncoder passwordEncoder) {
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<TransactionResponseDTO> getDetails(){
        List<TransactionModel> list = transactionRepository.findAll();

        List<TransactionResponseDTO> listDTO = list.stream()
                .map(list1 -> TransactionMapper.toDto(list1)).toList();

        return listDTO;
    }

    public TransactionResponseDTO createAccount(TransactionRequestDTO transactionRequestDTO){
        if (!transactionRequestDTO.getPassword().equals(transactionRequestDTO
                .getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        TransactionModel transactionModel = TransactionMapper.toModel(transactionRequestDTO);
        transactionModel.setPassword(passwordEncoder.encode(transactionRequestDTO.getPassword()));
        TransactionModel savedtransactionModel = transactionRepository.save(transactionModel);
        return TransactionMapper.toDto(savedtransactionModel);
    }

    public Optional<TransactionResponseDTO> getById(UUID id) {
        return transactionRepository.findById(id)
                .map(TransactionMapper::toDto);
    }

    public TransactionResponseDTO updateAccountByUsername(String username, TransactionRequestDTO dto) {
        TransactionModel existing = transactionRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        existing.setFullName(dto.getFullName());
        existing.setEmail(dto.getEmail());
        existing.setMobileNumber(dto.getMobileNumber());
        existing.setAddress(dto.getAddress());
        existing.setSecurityQuestion(dto.getSecurityQuestion());

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        TransactionModel updated = transactionRepository.save(existing);
        return TransactionMapper.toDto(updated);
    }

    public void deleteAccountByUsername(String username) {
        TransactionModel existing = transactionRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        transactionRepository.delete(existing);
    }
}
