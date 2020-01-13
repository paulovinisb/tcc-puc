package com.tcc.puc.repository;

import com.tcc.puc.model.Interessado;
import com.tcc.puc.model.Leitura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeituraRepository extends JpaRepository<Leitura, Long> {
    List<Leitura> findBySensorSensorId(Long sensorId);
}