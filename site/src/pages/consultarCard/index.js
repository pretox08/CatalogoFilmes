    import './index.scss';
import Cabecalho from '../../components/cabecalho';
import Menu from '../../components/menu';

import { ListarFilmes, ListarPorNome, DeletarFilme } from '../../api/filmeApi'
import { useEffect, useState } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import FilmeCard from '../../components/card'

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

    function Tabela() {
        nav('/admin/consultar')
    }

    return(
        <main className='page page-consultar'>
            <Menu selecionado='consultar' />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div>
                        <button onClick={Tabela}>Tabela de filmes</button>
                    </div>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' value={filtro} onChange={e => setFiltro(e.target.value)}/>
                        <img src='/assets/images/icon-buscar.svg' alt='buscar' onClick={Filtrar}/>
                    </div>



                    <div className='card-container'>

                        {filmes.map(item =>
                            
                            <FilmeCard item={item}
                             AbrirDetalhes={AbrirDetalhes}
                             EditarFilme={EdtarFilme}
                             RemoverFilme={RemoverFilme} />

                        )}

                    </div>
                </div>
            </div>
        </main>
    )}

    //stopPropagation é para que as funções das tags filhos funcionem mesmo tendo uma função na tag pai