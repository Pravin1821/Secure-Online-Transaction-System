package com.sk.backend.service;

import com.sk.backend.dto.TransactionResponseDTO;
import com.sk.backend.mapper.TransactionMapper;
import com.sk.backend.model.TransactionModel;
import com.sk.backend.repository.TransactionRepository;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    private final ListableBeanFactory listableBeanFactory;
    private TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository, ListableBeanFactory listableBeanFactory) {
        this.transactionRepository = transactionRepository;
        this.listableBeanFactory = listableBeanFactory;
    }

    public List<TransactionResponseDTO> getDetails(){
        List<TransactionModel> list = transactionRepository.findAll();

        List<TransactionResponseDTO> listDTO = list.stream()
                .map(list1 -> TransactionMapper.toDto(list1)).toList();

        return listDTO;
    }

}
