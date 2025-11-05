package com.sk.backend.mapper;

import com.sk.backend.dto.TransactionRequestDTO;
import com.sk.backend.dto.TransactionResponseDTO;
import com.sk.backend.model.TransactionModel;

public class TransactionMapper {
    public static TransactionResponseDTO toDto(TransactionModel transactionModel) {
        TransactionResponseDTO transDTO = new TransactionResponseDTO();
        transDTO.setId(transactionModel.getId().toString());
        transDTO.setFullName(transactionModel.getFullName());
        transDTO.setUserName(transactionModel.getUserName());
        transDTO.setEmail(transactionModel.getEmail());
        transDTO.setMobileNumber(transactionModel.getMobileNumber());
        transDTO.setAddress(transactionModel.getAddress());

        return transDTO;
    }

    public static TransactionModel toModel(TransactionRequestDTO transactionRequestDTO) {
        TransactionModel toModel = new TransactionModel();
        toModel.setFullName(transactionRequestDTO.getFullName());
        toModel.setUserName(transactionRequestDTO.getUserName());
        toModel.setEmail(transactionRequestDTO.getEmail());
        toModel.setMobileNumber(transactionRequestDTO.getMobileNumber());
        toModel.setAddress(transactionRequestDTO.getAddress());
        toModel.setSecurityQuestion(transactionRequestDTO.getSecurityQuestion());

        return toModel;
    }
}
