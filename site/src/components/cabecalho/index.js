import { useEffect, useState } from 'react';
import './index.scss';
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';

export default function Index() {

    const[usuario, setUsuario] = useState('');  
    const nav = useNavigate();

    useEffect(() => {
        if(!storage('usuario-logado')) {
            nav('/')
        } else {
            const usuarioLogado = storage('usuario-logado');
            setUsuario(usuarioLogado.nome);
        }
    }, [])


    return(
        <header className='comp-cabecalho'>
            <div className='bem-vindo'>Seja bem-vindo, {usuario}!</div>
            <div>
                <div className='usuario'>
                    <span>{usuario[0]}</span>
                </div>
            </div>
        </header>
    )
}