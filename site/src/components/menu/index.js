import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import storage, { set } from 'local-storage';
import { useState } from 'react';

export default function Index(props) {

    const nav = useNavigate();

    function Sair() {
        storage.remove('usuario-logado');
        nav('/');
    }

    function verificarMenuSelecionado(menu) {
        if(menu === props.selecionado)
            return 'selecionado';
        else
            return '';
    }


    return(

        <nav className="comp-menu">
            <div>
                <div className='logo'>
                    <img src="/assets/images/logo.svg" alt="logo" />
                    <div>Portifolio.me</div>
                </div>

                <div className='menu-items'>
                    <Link to='/admin' className={verificarMenuSelecionado('home')} >
                        <img src="/assets/images/icon-home.svg" alt="home" />
                        <div>Home</div>
                    </Link>
                    <Link to='/admin/cadastrar' className={verificarMenuSelecionado('cadastrar')} >
                        <img src="/assets/images/icon-cadastrar.svg" alt="cadastrar" />
                        <div>Cadastrar</div>
                    </Link>
                    <Link to='/admin/consultar' className={verificarMenuSelecionado('consultar')} >
                        <img src="/assets/images/icon-consultar.svg" alt="consultar" />
                        <div>Consultar</div>
                    </Link>
                </div>
            </div>

            <div className='menu-items'>
                <a onClick={Sair} href="#">
                    <img src="/assets/images/icon-sair.svg" alt="consultar" />
                    <div>Sair</div>
                </a>
            </div>
        </nav>
    )
    }