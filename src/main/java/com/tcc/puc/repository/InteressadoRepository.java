package com.tcc.puc.repository;

import com.tcc.puc.model.Interessado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InteressadoRepository extends JpaRepository<Interessado, Long> {
    List<Interessado> findByAreaAreaId(Long areaId);
}