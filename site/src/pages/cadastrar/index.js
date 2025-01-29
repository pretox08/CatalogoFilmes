import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'


import './index.scss'
import { useEffect, useState } from 'react';
import { CadastrarFilme, EnviarImagemFilme, AlterarFilme, BuscarPorId, BuscarImagem } from '../../api/filmeApi';
import storage from 'local-storage';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


export default function Index() {

    const[nome, setNome] = useState('');
    const[sinopse, setSinopse] = useState('');
    const[avaliacao, setAvaliacao] = useState(0);
    const[lancamento, setLancamento] = useState('');
    const[disponivel, setDisponivel] = useState(false);
    const[imagem, setImagem] = useState();
    const[id, setId] = useState(0);

    const { idParam } = useParams();

    useEffect(() => {
        if(idParam)
            CarregarFilme();
    }, []);

    async function CarregarFilme() {
        const r = await BuscarPorId(idParam);
        setNome(r.nome);
        setSinopse(r.sinopse);
        setAvaliacao(r.avaliacao);
        setLancamento(r.lancamento.substr(0, 10));
        setDisponivel(r.disponivel);
        setImagem(r.imagem);
        setId(r.id)
    }

    async function Salvar() {
        try {
            if(!imagem)
                throw new Error('Escolha a capa do filme!');

            const usuario = storage('usuario-logado').id;

            if(id === 0){
                const Novofilme = await CadastrarFilme(nome, avaliacao, lancamento, disponivel, sinopse, usuario);
                await EnviarImagemFilme(Novofilme.id, imagem);
                

                setId(Novofilme.id);
                toast.success('Filme cadastrado com sucesso!');

            } else {
                await AlterarFilme(id, nome, avaliacao, lancamento, disponivel, sinopse, usuario)

                if(typeof (imagem) == 'object')
                    await EnviarImagemFilme(id, imagem);
                
                toast.info('Filme Alterado!')
            }

        } catch (err) {
            if(err.response)
                toast.error(err.response.data.erro);
            else
                toast.error(err.message)
        }
    }

    function EscolherImagem() {
        document.getElementById('imagemCapa').click();
    }

    function MostrarImagem() {
        if(typeof (imagem) == 'object') {
            return URL.createObjectURL(imagem);
        }
        else {
            return BuscarImagem(imagem)
        }
    }

    function Novo(){
        setId(0);
        setNome('');
        setSinopse('');
        setAvaliacao(0);
        setImagem();
        setDisponivel(true);
        setLancamento('');
    }

    return (
        <main className='page page-cadastrar'>
            <Menu selecionado='cadastrar' />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>
                    <section>
                        <h1 className='titulo'><span>&nbsp;</span> Cadastrar Novo Filme</h1>

                        <div className='form-colums'>
                            <div>
                                <div className='upload-capa' onClick={EscolherImagem}>

                                        {!imagem &&
                                            <img src="/assets/images/icon-upload.svg" alt="" />
                                        }

                                        {imagem &&
                                            <img className='imagem-capa' src={MostrarImagem()} alt="" />
                                        }

                                        <input type='file' id='imagemCapa' onChange={e => setImagem(e.target.files[0])}/>
                                </div>
                            </div>
                            <div>
                                <div className='form-row'>
                                    <label>Nome:</label>
                                    <input type='text' placeholder='Nome do filme' value={nome} onChange={e => setNome(e.target.value)}/>
                                </div>
                                <div className='form-row'>
                                    <label>Avaliação:</label>
                                    <input type='number' placeholder='0' value={avaliacao} onChange={e => setAvaliacao(e.target.value)}/>
                                </div>
                                <div className='form-row'>
                                    <label>Lançamento:</label>
                                    <input type='date' value={lancamento} onChange={e => setLancamento(e.target.value)}/>
                                </div>
                                <br />
                                <div className='form-row'>
                                    <label></label>
                                    <input type='checkbox' checked={disponivel} onChange={e => setDisponivel(e.target.checked)} /> &nbsp; Disponível
                                </div>
                            </div>
                            <div>
                                <div className='form-row' style={{alignItems: 'flex-start'}}>
                                    <label style={{marginTop: '13px'}}>Sinopse:</label>
                                    <textarea placeholder='Sinopse do filme' value={sinopse} onChange={e => setSinopse(e.target.value)}/>
                                </div>
                                <br />
                                <br />
                                <div className='form-row'>
                                    <label></label>
                                    <div className='btnSalvar'>
                                        <button onClick={Salvar}>{id === 0 ? 'SALVAR' : 'ALTERAR'}</button> &nbsp; &nbsp;
                                        <button onClick={Novo}>NOVO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}