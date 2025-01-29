-- Cadastro de usuario
insert into tb_usuario (nm_usuario, ds_email, ds_senha)
			value('admin', 'admin@admin.com.br', '1234');


-- Efetuar Login
select id_usuario		as id,
	   nm_usuario		as nome,
       ds_email			as email
	from tb_usuario
    where ds_email		= 'admin@admin.com.br'
    and ds_senha		= '1234';
    
    
    
-- Cadastrar Filme
insert into tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
			values(1, 'Harry Potter e a Câmara Secreta', 'Filme chato', 7.5, '2012-02-11', true);


-- Alterar a imagem do filme
update tb_filme
	   set img_filme		= '/storage/filmes/203948.jpg'
where id_filme = 1;


-- Alterar
update tb_filme
	   set nm_filme 	= 'Harry Potter e a Pedra Filosofal',
       ds_sinopse		= 'Filme chatao',
       vl_avaliacao		=  7,
       dt_lancamento	= '2010-05-03',
where id_filme = 1;


-- Remover Filme
delete from tb_filme
		where id_filme = 1;
        
        
-- Consultar Filmes
select id_filme			id,
	   nm_filme			nome,
       ds_sinopse		sinopse,
       vl_avaliacao		avaliacao,
       dt_lancamento	lancamento,
       bt_disponivel	disponivel,
       img_filme		capa
	from tb_filme