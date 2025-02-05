

create database db_filme;
use db_filme;

create table tb_usuario (
	id_usuario		int primary key auto_increment,
    nm_usuario		varchar(100),
    ds_email		varchar(100),
    ds_senha		varchar(100)
);

create table tb_filme(
	id_filme		int primary key auto_increment,
    id_usuario		int,
    nm_filme		varchar(100),
    ds_sinopse		varchar(4000),
    vl_avaliacao	decimal(15,2),
    dt_lancamento	date,
    bt_disponivel	boolean,
    img_filme		varchar(800),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario (id_usuario)
);