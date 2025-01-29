import './index.scss';
import Cabecalho from '../../components/cabecalho';
import Detalhe from '../../components/detalhe';
import Menu from '../../components/menu';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BuscarPorId } from '../../api/filmeApi';

export default function Index() {

    const[filme, setFilme] = useState({})

    const { idParam } = useParams();

    useEffect(() => {
        CarregarFilme();
    }, [])  

    async function CarregarFilme() {
        const r = await BuscarPorId(idParam);
        setFilme(r)
    }

    return(
        <main className='page page-detalhe'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>
                    <Detalhe filme={filme} />
                </div>
            </div>
        </main>
    )
}