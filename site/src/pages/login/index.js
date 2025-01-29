import { useState, useRef, useEffect } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { Login } from '../../api/usuarioApi';
import storage from 'local-storage';


export default function Index(){

    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[erro, setErro] = useState('');
    const[carregando, setCarregando] = useState(false);

    const nav = useNavigate();
    const ref = useRef();

    useEffect(() => {
        if(storage('usuario-logado'))
            nav('/admin')
    })

    async function Logar(){
        setCarregando(true);
        ref.current.continuousStart();


        try {
            const r = await Login(email, senha);
            storage('usuario-logado', r);

            setTimeout(() => {
                nav('/admin')  
            }, 2500)

        } catch(err){
            ref.current.complete();
            setCarregando(false);
            if(err.response.status === 401){
                setErro(err.response.data.erro)
            }
        }
    }



    return(
        <main className='page page-login'>
            <LoadingBar color='#a48ceb' ref={ref}/>
            <section className="box-login">

                <div className="bem-vindo">
                    <img src="/assets/images/logo.svg" alt="logo" />
                    <h1> Seja Bem-vindo!</h1>
                </div>

                <div>
                    <div className='form-row'>
                        <label>E-mail:</label>
                        <input type='text' placeholder='Informe seu e-mail' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label>Senha:</label>
                        <input type='password' placeholder='***' value={senha} onChange={e => setSenha(e.target.value)}/>
                    </div>
                    <div className='form-entrar'>
                        <button className='btn-black' onClick={Logar} disabled={carregando}>ENTRAR</button> 
                    </div>
                    <div className='form-entrar invalido'>
                        {erro}
                    </div>
                </div>

            </section>
        </main>
    )
}