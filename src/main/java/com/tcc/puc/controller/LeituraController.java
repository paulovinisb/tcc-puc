package com.tcc.puc.controller;

import com.tcc.puc.exception.ResourceNotFoundException;
import com.tcc.puc.model.Leitura;
import com.tcc.puc.repository.LeituraRepository;
import com.tcc.puc.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class LeituraController {

    @Autowired
    private LeituraRepository leituraRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @GetMapping("/areas/{areaId}/sensors/{sensorId}/leituras")
    @Cacheable("leituras")
    public List<Leitura> getLeituras(@PathVariable Long areaId, @PathVariable Long sensorId) {
        return leituraRepository.findBySensorSensorId(sensorId);
    }

    @PostMapping("/areas/{areaId}/sensors/{sensorId}/leituras")
    public Leitura creatAleitura(@PathVariable Long areaId, @PathVariable Long sensorId, @Valid @RequestBody Leitura leitura) {
        return sensorRepository.findById(sensorId)
                .map(sensor -> {
                    leitura.setSensor(sensor);
                    return leituraRepository.save(leitura);
                }).orElseThrow(() -> new ResourceNotFoundException("Sensor not found with id " + sensorId));
    }

    @PutMapping("/areas/{areaId}/sensors/{sensorId}/leituras/{leituraId}")
    public Leitura updateLeitura(@PathVariable Long areaId, @PathVariable Long sensorId, @PathVariable Long leituraId,
                                 @Valid @RequestBody Leitura leituraRequest) {

        if (!sensorRepository.existsById(sensorId)) {
            throw new ResourceNotFoundException("Sensor not found with id " + sensorId);
        }

        return leituraRepository.findById(leituraId)
                .map(leitura -> {
                    leitura.setLeitura_tipo(leituraRequest.getLeitura_tipo());
                    leitura.setLeitura_valor(leituraRequest.getLeitura_valor());
                    leitura.setLeitura_horario(leituraRequest.getLeitura_horario());
                    return leituraRepository.save(leitura);
                }).orElseThrow(() -> new ResourceNotFoundException("Leitura not found with id " + leituraId));
    }

    @DeleteMapping("/areas/{areaId}/sensors/{sensorId}/leituras/{leituraId}")
    public ResponseEntity<?> deleteLeitura(@PathVariable Long areaId, @PathVariable Long sensorId, @PathVariable Long leituraId) {

        if (!sensorRepository.existsById(sensorId)) {
            throw new ResourceNotFoundException("Sensor not found with id " + sensorId);
        }

        return leituraRepository.findById(leituraId)
                .map(leitura -> {
                    leituraRepository.delete(leitura);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Leitura not found with id " + leituraId));
    }
}
