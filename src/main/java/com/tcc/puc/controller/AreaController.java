package com.tcc.puc.controller;

import com.tcc.puc.exception.ResourceNotFoundException;
import com.tcc.puc.model.Area;
import com.tcc.puc.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000","http://52.67.253.69:3000"})
@RestController
public class AreaController {

    @Autowired
    private AreaRepository areaRepository;

    @GetMapping("/areas")
    @Cacheable("areas")
    public List<Area> getAreas() {
        return areaRepository.findAll();
    }

    @GetMapping("/areas/{areaId}")
    public Optional<Area> getArea(@PathVariable Long areaId) {
        return areaRepository.findById(areaId);
    }

    @PostMapping("/areas")
    public Area creatAarea(@Valid @RequestBody Area area) {
        return areaRepository.save(area);
    }

    @PutMapping("/areas/{areaId}")
    public Area updateArea(@PathVariable Long areaId,
                           @Valid @RequestBody Area areaRequest) {
        return areaRepository.findById(areaId)
                .map(area -> {
                    area.setArea_nome(areaRequest.getArea_nome());
                    area.setArea_coordenadas(areaRequest.getArea_coordenadas());
                    area.setArea_tipo(areaRequest.getArea_tipo());
                    return areaRepository.save(area);
                }).orElseThrow(() -> new ResourceNotFoundException("Area not found with id " + areaId));
    }

    @DeleteMapping("/areas/{areaId}")
    public ResponseEntity<?> deleteArea(@PathVariable Long areaId) {
        return areaRepository.findById(areaId)
                .map(area -> {
                    areaRepository.delete(area);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Area not found with id " + areaId));
    }
}
