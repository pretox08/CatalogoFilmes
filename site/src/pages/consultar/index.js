import './index.scss';
import Cabecalho from '../../components/cabecalho';
import Menu from '../../components/menu';

import { ListarFilmes, ListarPorNome, DeletarFilme } from '../../api/filmeApi'
import { useEffect, useState } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Index(){

    const[filmes, setFilmes] = useState([]);
    const[filtro, setFiltro] = useState('');

    const nav = useNavigate();

    function EdtarFilme(id) {
        nav(`/admin/alterar/${id}`)
    }

    function AbrirDetalhes(id) {
        nav(`/admin/detalhe/${id}`)
    }


    async function CarregarTodos() {
        const resp = await ListarFilmes();
        setFilmes(resp);
    }

    async function Filtrar() {
        const resp = await ListarPorNome(filtro);
        setFilmes(resp)
    }

    useEffect(() => {
        CarregarTodos();
    }, [])


    async function RemoverFilme(id, nome) {

        confirmAlert({
            title: 'Remover Filme',
            message: `Tem certeza que quer remover o filme ${nome} ?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        await DeletarFilme(id, nome);
                        if(filtro === '') {
                            CarregarTodos();
                            toast.dark('Filme removido!')
                        }
                        else {
                            Filtrar();
                            
                        }
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    function Cards() {
        nav('/admin/consultarCard')
    }

    return(
        <main className='page page-consultar'>
            <Menu selecionado='consultar' />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div>
                        <button onClick={Cards}>Página com cards</button>
                    </div>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' value={filtro} onChange={e => setFiltro(e.target.value)}/>
                        <img src='/assets/images/icon-buscar.svg' alt='buscar' onClick={Filtrar}/>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>IDENTIFICAÇÃO</th>
                                <th>FILME</th>
                                <th>AVALIAÇÃO</th>
                                <th>LANÇAMENTO</th>
                                <th>DISPONÍVEL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filmes.map(item => 
                                <tr key={item.id} onClick={() => AbrirDetalhes(item.id)}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.avaliacao}</td>
                                    <td>{item.lancamento.substr(0, 10)}</td>
                                    <td>{item.disponivel ? 'Sim' : 'Não'}</td>
                                    <td>
                                        <img src='/assets/images/icon-editar.svg' alt='editar'
                                         onClick={e => {e.stopPropagation();
                                        EdtarFilme(item.id)
                                        }} />

                                        <img src='/assets/images/icon-remover.svg' alt='remover'
                                         onClick={e => {e.stopPropagation();
                                        RemoverFilme(item.id, item.nome)
                                        }} />
                                        
                                    </td>
                                </tr>
                            )}
                            

                        </tbody>
                    </table>
                    
                </div>
            </div>
        </main>
    )}

    //stopPropagation é para que as funções das tags filhos funcionem mesmo tendo uma função na tag pai