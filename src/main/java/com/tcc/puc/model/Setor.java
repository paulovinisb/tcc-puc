package com.tcc.puc.model;

import javax.persistence.*;

@Entity
@Table(name = "setor")
public class Setor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long setor_id;

    private String setor_nome;
    private String setor_tipo;

    public Long getSetor_id() {
        return setor_id;
    }

    public void setSetor_id(Long setor_id) {
        this.setor_id = setor_id;
    }

    public String getSetor_nome() {
        return setor_nome;
    }

    public void setSetor_nome(String setor_nome) {
        this.setor_nome = setor_nome;
    }

    public String getSetor_tipo() {
        return setor_tipo;
    }

    public void setSetor_tipo(String setor_tipo) {
        this.setor_tipo = setor_tipo;
    }
}
