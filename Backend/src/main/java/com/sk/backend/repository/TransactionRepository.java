package com.sk.backend.repository;

import com.sk.backend.model.TransactionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionModel, UUID> {
    Optional<TransactionModel> findByUserName(String userName);
    void deleteByUserName(String userName);

}
