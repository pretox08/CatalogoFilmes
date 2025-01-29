import { Router } from "express";
import { InserirFilme, AtualizarImagem, ListarFilmes, BuscarPorId, BuscarPorNome, DeletarFilme, AlterarFilme } from "../repositories/filmeRepository.js";
import multer from 'multer';
import { initializeConnection } from "../repositories/connection.js";

const server = Router();
const upload = multer({ dest: 'storage/capaFilmes' });



server.post('/filme', async (req, resp) => {
    try {
        const filme = req.body;

        if (!filme.usuario || !filme.nome || !filme.sinopse || !filme.avaliacao || !filme.lancamento || filme.disponivel == undefined) {
            throw new Error('Todos os campos são obrigatórios!');
        }

        const novoFilme = await InserirFilme(filme);
        resp.send(novoFilme);
    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            throw new Error('Imagem não enviada!');
        }
        
        const imagem = req.file.path;

        const con = await initializeConnection();
        const resposta = await AtualizarImagem(con, imagem, id);
        
        if (resposta != 1) {
            throw new Error('A imagem não pôde ser salva!');
        }
        
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

server.get('/filmes', async (req, resp) => {
    try {
        const resposta = await ListarFilmes();
        resp.send(resposta);
        
    } catch(err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/filme/busca', async (req, resp) => {
    try {
        const { nome } = req.query;
        
        const resposta = await BuscarPorNome(nome);
        
        if (resposta.length === 0) {
            resp.status(404).send([]);
        } else {
            resp.send(resposta);
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.get('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const resposta = await BuscarPorId(id);
        
        if (!resposta) {
            resp.status(404).send('Filme não encontrado!');
        }
        else {
            resp.send(resposta);
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.delete('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const resposta = await DeletarFilme(id);
        if(resposta != 1)
            throw new Error('Filme não encontrado!');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }

})


server.put('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const filme = req.body;

        if (!filme.usuario || !filme.nome || !filme.sinopse || !filme.avaliacao || !filme.lancamento || filme.disponivel == undefined) {
            throw new Error('Todos os campos são obrigatórios!');
        }
        const resposta = await AlterarFilme(id, filme);
        
        if (resposta != 1) {
            throw new Error('O filme não pôde ser alterado!');
        }
        
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default server;