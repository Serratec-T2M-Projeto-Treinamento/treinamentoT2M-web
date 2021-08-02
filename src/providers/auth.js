import React,{useState} from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    const [colaborador, setColaborador] = useState({});
    const [usuario, setUsuario] = useState({});
    
    return (
        <AuthContext.Provider 
        value={{ 
            colaborador,setColaborador:(colaborador)=>setColaborador(colaborador),
            usuario,setUsuario:(usuario)=>setUsuario(usuario),
             }}>
            {props.children}
        </AuthContext.Provider>
    )
}