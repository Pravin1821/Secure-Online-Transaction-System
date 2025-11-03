package com.sk.backend.mapper;

import com.sk.backend.dto.TransactionResponseDTO;
import com.sk.backend.model.TransactionModel;

public class TransactionMapper {
    public static TransactionResponseDTO toDto(TransactionModel transactionModel) {
        TransactionResponseDTO transDTO=new TransactionResponseDTO();
        transDTO.setId(transactionModel.getId().toString());
        transDTO.setFullName(transactionModel.getFullName());
        transDTO.setUserName(transactionModel.getUserName());
        transDTO.setEmail(transactionModel.getEmail());
        transDTO.setPhone(transDTO.getPhone());
        transDTO.setAddress(transactionModel.getAddress());

        return transDTO;
    }
}
