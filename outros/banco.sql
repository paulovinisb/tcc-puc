CREATE ROLE viniealan WITH LOGIN CREATEDB ENCRYPTED PASSWORD '01051995';

CREATE DATABASE gestao_ambiental;

CREATE TABLE setor(
   setor_id serial PRIMARY KEY,
   setor_nome VARCHAR (255),
   setor_tipo VARCHAR (255)
);

CREATE TABLE area(
   area_id serial PRIMARY KEY,
   area_nome VARCHAR (255),
   area_coordenadas VARCHAR (255),
   area_tipo VARCHAR (255)
);

CREATE TABLE interessado(
   interessado_id serial PRIMARY KEY,
   area_id INTEGER REFERENCES area(area_id),
   interessado_nome VARCHAR (255),
   interessado_celular VARCHAR (255),
   interessado_email VARCHAR (255),
   interessado_endereco VARCHAR (255)
);

CREATE TABLE usuario(
   usuario_id serial PRIMARY KEY,
   setor_id INTEGER REFERENCES setor(setor_id),
   interessado_id INTEGER REFERENCES interessado(interessado_id),
   usuario_perfil VARCHAR (255),
   usuario_nome VARCHAR (255),
   usuario_senha VARCHAR (255)
);

CREATE TABLE sensor(
   sensor_id serial PRIMARY KEY,
   area_id INTEGER REFERENCES area(area_id),
   sensor_tipo VARCHAR (255),
   sensor_coordenada VARCHAR (255),
   sensor_status VARCHAR (255)
);

CREATE TABLE leitura(
   leitura_id serial PRIMARY KEY,
   sensor_id INTEGER REFERENCES sensor(sensor_id),
   leitura_tipo VARCHAR (255),
   leitura_valor VARCHAR (255),
   leitura_horario TIMESTAMP
);

{
"area_nome": "Area 1",
"area_coordenadas": "Coordenada 1",
"area_tipo": "Tipo 1"
}

{
"interessado_nome": "Nome 1",
"interessado_celular": "Celular 1",
"interessado_email": "Email 1",
"interessado_endereco": "Endereço 1"
}

{
"sensor_tipo": "Tipo 1",
"sensor_coordenada": "Coordenada 1",
"sensor_status": "Status 1"
}

{
"leitura_tipo": "Tipo 2",
"leitura_valor": "Valor 2",
"leitura_horario": "2020-01-13T01:58:00.000Z"
}