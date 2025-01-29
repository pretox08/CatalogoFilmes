import {con} from './connection.js';

export async function InserirFilme(filme) {
    const comando = `insert into tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
			        values(?, ?, ?, ?, ?, ?)`;

    const [resposta] = await con.query(comando, [filme.usuario,
                                               filme.nome,
                                               filme.sinopse,
                                               filme.avaliacao,
                                               filme.lancamento,
                                               filme.disponivel]);
    filme.id = resposta.insertId;
    return filme;
}

export async function AtualizarImagem(con, imagem, id) {
    const [result] = await con.execute('UPDATE tb_filme SET img_filme = ? WHERE id_filme = ?', [imagem, id]);
    return result.affectedRows;
}

export async function ListarFilmes() {
    const comando = `select id_filme			    id,
                            nm_filme			    nome,
                            vl_avaliacao		    avaliacao,
                            dt_lancamento	        lancamento,
                            bt_disponivel	        disponivel,
                            id_usuario              usuario
	                from tb_filme`;

    const [linhas] = await con.query(comando);
    return linhas;
}

export async function BuscarPorId(id) {
    const comando = `select id_filme			    id,
                            nm_filme			    nome,
                            ds_sinopse              sinopse,
                            vl_avaliacao		    avaliacao,
                            dt_lancamento	        lancamento,
                            bt_disponivel	        disponivel,
                            img_filme               imagem,
                            id_usuario              usuario
                        from tb_filme
                        where id_filme = ?`;

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}

export async function BuscarPorNome(nome) {
    const comando = `select id_filme			    id,
                            nm_filme			    nome,
                            vl_avaliacao		    avaliacao,
                            dt_lancamento	        lancamento,
                            bt_disponivel	        disponivel,
                            id_usuario              usuario
                        from tb_filme
                        where nm_filme like ? `;

    const [linhas] = await con.query(comando, [`%${nome}%`]);
    return linhas;
}


export async function DeletarFilme(id) {
    const comando = `delete from tb_filme
                     where id_filme = ?`;

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}


export async function AlterarFilme(id, filme) {
    const comando = `update tb_filme
                     set nm_filme = ?,
                         ds_sinopse = ?,
                         vl_avaliacao = ?,
                         dt_lancamento = ?,
                         bt_disponivel = ?,
                         id_usuario = ?
                     where id_filme = ?`;

    const [resposta] = await con.query(comando, [filme.nome,
                                               filme.sinopse,
                                               filme.avaliacao,
                                               filme.lancamento,
                                               filme.disponivel,
                                               filme.usuario,
                                               id]);
    return resposta.affectedRows;
}