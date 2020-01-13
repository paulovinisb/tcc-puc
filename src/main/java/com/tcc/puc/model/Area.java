package com.tcc.puc.model;

import javax.persistence.*;

@Entity
@Table(name = "area")
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "area_id", nullable = false)
    private Long areaId;

    private String area_nome;
    private String area_coordenadas;
    private String area_tipo;

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public String getArea_nome() {
        return area_nome;
    }

    public void setArea_nome(String area_nome) {
        this.area_nome = area_nome;
    }

    public String getArea_coordenadas() {
        return area_coordenadas;
    }

    public void setArea_coordenadas(String area_coordenadas) {
        this.area_coordenadas = area_coordenadas;
    }

    public String getArea_tipo() {
        return area_tipo;
    }

    public void setArea_tipo(String area_tipo) {
        this.area_tipo = area_tipo;
    }
}
