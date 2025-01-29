import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:5000'
})



export async function CadastrarFilme(nome, avaliacao, lancamento, disponivel, sinopse, usuario) {
    try {
        const r = await api.post('/filme', {
            nome: nome,
            avaliacao: avaliacao,
            lancamento: lancamento,
            disponivel: disponivel,
            sinopse: sinopse,
            usuario: usuario
        });
        return r.data;
    } catch (err) {
        console.error('Error response:', err.response);
        throw err;
    }
}




export async function EnviarImagemFilme(id, imagem) {
    const formData = new FormData();
    formData.append('capa', imagem);

    const r = await api.put(`/filme/${id}/capa`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return r.status
}

//New é usado para criar um objeto




export async function AlterarFilme(id, nome, avaliacao, lancamento, disponivel, sinopse, usuario) {
    try {
        const r = await api.put(`/filme/${id}`, {
            nome: nome,
            avaliacao: avaliacao,
            lancamento: lancamento,
            disponivel: disponivel,
            sinopse: sinopse,
            usuario: usuario
        });
        return r.data;
    } catch (err) {
        console.error('Error response:', err.response);
        throw err;
    }
}

export async function ListarFilmes() {
    const r = await api.get('/filmes');
    return r.data
}

export async function ListarPorNome(nome){
    const r = await api.get(`/filme/busca?nome=${nome}`)
    return r.data
}




export async function DeletarFilme(id) {
    try {
        const response = await api.delete(`/filme/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error response:', err.response);
        throw err;
    }
}


export async function BuscarPorId(id) {
    const r = await api.get(`/filme/${id}`)
    return r.data
}


export function BuscarImagem(imagem) {
    return `${api.getUri()}/${imagem}`
}