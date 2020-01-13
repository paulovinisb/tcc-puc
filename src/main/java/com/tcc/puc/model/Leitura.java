package com.tcc.puc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "leitura")
public class Leitura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leitura_id;

    private String leitura_tipo;
    private String leitura_valor;
    private Timestamp leitura_horario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sensor_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Sensor sensor;

    public Long getLeitura_id() {
        return leitura_id;
    }

    public void setLeitura_id(Long leitura_id) {
        this.leitura_id = leitura_id;
    }

    public String getLeitura_tipo() {
        return leitura_tipo;
    }

    public void setLeitura_tipo(String leitura_tipo) {
        this.leitura_tipo = leitura_tipo;
    }

    public String getLeitura_valor() {
        return leitura_valor;
    }

    public void setLeitura_valor(String leitura_valor) {
        this.leitura_valor = leitura_valor;
    }

    public Timestamp getLeitura_horario() {
        return leitura_horario;
    }

    public void setLeitura_horario(Timestamp leitura_horario) {
        this.leitura_horario = leitura_horario;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }
}
