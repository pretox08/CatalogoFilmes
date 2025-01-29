import {con} from './connection.js';

export async function Login(email,senha) {

    const comando = `select id_usuario	    id,
                    nm_usuario		        nome,
                    ds_email			    email
                    from tb_usuario
                    where ds_email		= ?
                    and ds_senha		= ?`;

    const [linhas] = await con.query(comando,[email,senha])
    return linhas[0];
}