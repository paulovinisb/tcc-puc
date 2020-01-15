package com.tcc.puc.controller;

import com.tcc.puc.exception.ResourceNotFoundException;
import com.tcc.puc.model.Usuario;
import com.tcc.puc.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/usuarios")
    @Cacheable("usuarios")
    public Page<Usuario> getUsuarios(Pageable pageable) {
        return usuarioRepository.findAll(pageable);
    }

    @PostMapping("/usuarios")
    public Usuario creatAusuario(@Valid @RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/usuarios/{usuarioId}")
    public Usuario updateUsuario(@PathVariable Long usuarioId,
                           @Valid @RequestBody Usuario usuarioRequest) {
        return usuarioRepository.findById(usuarioId)
                .map(usuario -> {
                    usuario.setUsuario_perfil(usuarioRequest.getUsuario_perfil());
                    usuario.setUsuario_nome(usuarioRequest.getUsuario_nome());
                    usuario.setUsuario_senha(usuarioRequest.getUsuario_senha());
                    return usuarioRepository.save(usuario);
                }).orElseThrow(() -> new ResourceNotFoundException("Usuario not found with id " + usuarioId));
    }

    @DeleteMapping("/usuarios/{usuarioId}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long usuarioId) {
        return usuarioRepository.findById(usuarioId)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Usuario not found with id " + usuarioId));
    }
}
