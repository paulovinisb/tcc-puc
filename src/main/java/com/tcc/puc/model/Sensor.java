package com.tcc.puc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "sensor")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sensor_id", nullable = false)
    private Long sensorId;

    private String sensor_tipo;
    private String sensor_coordenada;
    private String sensor_status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Area area;

    public Long getSensorId() {
        return sensorId;
    }

    public void setSensorId(Long sensorId) {
        this.sensorId = sensorId;
    }

    public String getSensor_tipo() {
        return sensor_tipo;
    }

    public void setSensor_tipo(String sensor_tipo) {
        this.sensor_tipo = sensor_tipo;
    }

    public String getSensor_coordenada() {
        return sensor_coordenada;
    }

    public void setSensor_coordenada(String sensor_coordenada) {
        this.sensor_coordenada = sensor_coordenada;
    }

    public String getSensor_status() {
        return sensor_status;
    }

    public void setSensor_status(String sensor_status) {
        this.sensor_status = sensor_status;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }
}
