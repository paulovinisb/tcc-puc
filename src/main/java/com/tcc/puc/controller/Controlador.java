package com.tcc.puc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = {"http://localhost:3000","http://52.67.253.69:3000"})
@Controller
public class Controlador {
    private static final Logger logger
            = LoggerFactory.getLogger(Controlador.class);

    @RequestMapping("/")
    public @ResponseBody
    String greeting() {
        logger.info("Uma pessoa acessou a página! {}", Controlador.class.getSimpleName());

        return "Funcionando";
    }
}