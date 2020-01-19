package com.tcc.puc.controller;

import com.tcc.puc.exception.ResourceNotFoundException;
import com.tcc.puc.model.Interessado;
import com.tcc.puc.model.Sensor;
import com.tcc.puc.repository.AreaRepository;
import com.tcc.puc.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private AreaRepository areaRepository;

    @GetMapping("/areas/{areaId}/sensors")
    @Cacheable("sensors")
    public List<Sensor> getSensors(@PathVariable Long areaId) {
        return sensorRepository.findByAreaAreaId(areaId);
    }

    @GetMapping("/areas/{areaId}/sensors/{sensorId}")
    public Optional<Sensor> getSensors(@PathVariable Long areaId, @PathVariable Long sensorId) {
        return sensorRepository.findById(sensorId);
    }

    @PostMapping("/areas/{areaId}/sensors")
    public Sensor creatAsensor(@PathVariable Long areaId, @Valid @RequestBody Sensor sensor) {
        return areaRepository.findById(areaId)
                .map(area -> {
                    sensor.setArea(area);
                    return sensorRepository.save(sensor);
                }).orElseThrow(() -> new ResourceNotFoundException("Area not found with id " + areaId));
    }

    @PutMapping("/areas/{areaId}/sensors/{sensorId}")
    public Sensor updateSensor(@PathVariable Long areaId, @PathVariable Long sensorId,
                               @Valid @RequestBody Sensor sensorRequest) {

        if (!areaRepository.existsById(areaId)) {
            throw new ResourceNotFoundException("Area not found with id " + areaId);
        }

        return sensorRepository.findById(sensorId)
                .map(sensor -> {
                    sensor.setSensor_tipo(sensorRequest.getSensor_tipo());
                    sensor.setSensor_coordenada(sensorRequest.getSensor_coordenada());
                    sensor.setSensor_status(sensorRequest.getSensor_status());
                    return sensorRepository.save(sensor);
                }).orElseThrow(() -> new ResourceNotFoundException("Sensor not found with id " + sensorId));
    }

    @DeleteMapping("/areas/{areaId}/sensors/{sensorId}")
    public ResponseEntity<?> deleteSensor(@PathVariable Long areaId, @PathVariable Long sensorId) {

        if (!areaRepository.existsById(areaId)) {
            throw new ResourceNotFoundException("Area not found with id " + areaId);
        }

        return sensorRepository.findById(sensorId)
                .map(sensor -> {
                    sensorRepository.delete(sensor);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Sensor not found with id " + sensorId));
    }
}
