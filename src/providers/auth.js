import React,{useState} from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    const [colaborador, setColaborador] = useState({});
    const [usuario, setUsuario] = useState({});
    const [endereco, setEndereco] = useState({});
    const [formacao, setFormacao] = useState({});
    const [posicao, setPosicao] = useState({});
    
    return (
        <AuthContext.Provider 
        value={{ 
            colaborador,setColaborador:(colaborador)=>setColaborador(colaborador),
            usuario,setUsuario:(usuario)=>setUsuario(usuario),
            endereco,setEndereco:(endereco)=>setEndereco(endereco),
            formacao,setFormacao:(formacao)=>setFormacao(formacao),
            posicao,setPosicao:(posicao)=>setPosicao(posicao),
             }}>
            {props.children}
        </AuthContext.Provider>
    )
}