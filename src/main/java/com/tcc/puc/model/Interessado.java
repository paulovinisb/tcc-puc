package com.tcc.puc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "interessado")
public class Interessado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interessado_id;

    private String interessado_nome;
    private String interessado_celular;
    private String interessado_email;
    private String interessado_endereco;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Area area;

    public Long getInteressado_id() {
        return interessado_id;
    }

    public void setInteressado_id(Long interessado_id) {
        this.interessado_id = interessado_id;
    }

    public String getInteressado_nome() {
        return interessado_nome;
    }

    public void setInteressado_nome(String interessado_nome) {
        this.interessado_nome = interessado_nome;
    }

    public String getInteressado_celular() {
        return interessado_celular;
    }

    public void setInteressado_celular(String interessado_celular) {
        this.interessado_celular = interessado_celular;
    }

    public String getInteressado_email() {
        return interessado_email;
    }

    public void setInteressado_email(String interessado_email) {
        this.interessado_email = interessado_email;
    }

    public String getInteressado_endereco() {
        return interessado_endereco;
    }

    public void setInteressado_endereco(String interessado_endereco) {
        this.interessado_endereco = interessado_endereco;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }
}
