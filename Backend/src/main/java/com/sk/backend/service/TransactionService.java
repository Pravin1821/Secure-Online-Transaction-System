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
        TransactionModel savedtransactionModel = transactionRepository.save(TransactionMapper.toModel(transactionRequestDTO));
        return TransactionMapper.toDto(savedtransactionModel);
    }
}
