package com.tcc.puc.controller;

import com.tcc.puc.exception.ResourceNotFoundException;
import com.tcc.puc.model.Interessado;
import com.tcc.puc.repository.AreaRepository;
import com.tcc.puc.repository.InteressadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class InteressadoController {

    @Autowired
    private InteressadoRepository interessadoRepository;

    @Autowired
    private AreaRepository areaRepository;

    @GetMapping("/areas/{areaId}/interessados")
    @Cacheable("interessados")
    public List<Interessado> getInteressadosByAreaId(@PathVariable Long areaId) {
        return interessadoRepository.findByAreaAreaId(areaId);
    }

    @PostMapping("/areas/{areaId}/interessados")
    public Interessado addInteressado(@PathVariable Long areaId, @Valid @RequestBody Interessado interessado) {
        return areaRepository.findById(areaId)
                .map(area -> {
                    interessado.setArea(area);
                    return interessadoRepository.save(interessado);
                }).orElseThrow(() -> new ResourceNotFoundException("Area not found with id " + areaId));
    }

    @PutMapping("/areas/{areaId}/interessados/{interessadoId}")
    public Interessado updateInteressado(@PathVariable Long areaId, @PathVariable Long interessadoId,
                                         @Valid @RequestBody Interessado interessadoRequest) {

        if (!areaRepository.existsById(areaId)) {
            throw new ResourceNotFoundException("Area not found with id " + areaId);
        }

        return interessadoRepository.findById(interessadoId)
                .map(interessado -> {
                    interessado.setInteressado_nome(interessadoRequest.getInteressado_nome());
                    interessado.setInteressado_celular(interessadoRequest.getInteressado_celular());
                    interessado.setInteressado_email(interessadoRequest.getInteressado_email());
                    interessado.setInteressado_endereco(interessadoRequest.getInteressado_endereco());
                    return interessadoRepository.save(interessado);
                }).orElseThrow(() -> new ResourceNotFoundException("Interessado not found with id " + interessadoId));
    }

    @DeleteMapping("/areas/{areaId}/interessados/{interessadoId}")
    public ResponseEntity<?> deleteInteressado(@PathVariable Long areaId, @PathVariable Long interessadoId) {

        if (!areaRepository.existsById(areaId)) {
            throw new ResourceNotFoundException("Area not found with id " + areaId);
        }

        return interessadoRepository.findById(interessadoId)
                .map(interessado -> {
                    interessadoRepository.delete(interessado);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Interessado not found with id " + interessadoId));
    }
}
