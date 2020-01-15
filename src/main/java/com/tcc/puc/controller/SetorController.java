package com.tcc.puc.controller;

import com.tcc.puc.exception.ResourceNotFoundException;
import com.tcc.puc.model.Setor;
import com.tcc.puc.repository.SetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class SetorController {

    @Autowired
    private SetorRepository setorRepository;

    @GetMapping("/setors")
    @Cacheable("setors")
    public Page<Setor> getSetors(Pageable pageable) {
        return setorRepository.findAll(pageable);
    }

    @PostMapping("/setors")
    public Setor creatAsetor(@Valid @RequestBody Setor setor) {
        return setorRepository.save(setor);
    }

    @PutMapping("/setors/{setorId}")
    public Setor updateSetor(@PathVariable Long setorId,
                           @Valid @RequestBody Setor setorRequest) {
        return setorRepository.findById(setorId)
                .map(setor -> {
                    setor.setSetor_nome(setorRequest.getSetor_nome());
                    setor.setSetor_tipo(setorRequest.getSetor_tipo());
                    return setorRepository.save(setor);
                }).orElseThrow(() -> new ResourceNotFoundException("Setor not found with id " + setorId));
    }

    @DeleteMapping("/setors/{setorId}")
    public ResponseEntity<?> deleteSetor(@PathVariable Long setorId) {
        return setorRepository.findById(setorId)
                .map(setor -> {
                    setorRepository.delete(setor);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Setor not found with id " + setorId));
    }
}
