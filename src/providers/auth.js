import React,{useState} from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    const [endereco, setEndereco] = useState({});
    const [colaborador, setColaborador] = useState({});
    
    return (
        <AuthContext.Provider 
        value={{ 
            endereco, setEndereco:(endereco)=>setEndereco(endereco),
            colaborador,setColaborador:(colaborador)=>setColaborador(colaborador)
             }}>
            {props.children}
        </AuthContext.Provider>
    )
}