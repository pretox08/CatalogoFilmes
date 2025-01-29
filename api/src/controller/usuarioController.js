import { Router } from 'express';
import { Login } from '../repositories/usuarioRepository.js';
const server = Router();


server.post('/usuario/login', async (req, resp) => {
    try {
        const {email, senha} = req.body;
        const usuario = await Login(email, senha);
        if(!usuario) {
            throw new Error('Usuário ou senha inválidos')
        }

        resp.send(usuario)
        
    } catch(err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

export default server;