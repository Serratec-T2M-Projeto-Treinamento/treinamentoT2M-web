import React,{useState} from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    const [colaborador, setColaborador] = useState({});
    return (
        <AuthContext.Provider value={{ colaborador,setColaborador:(colaborador)=>setColaborador(colaborador) }}>
            {props.children}
        </AuthContext.Provider>
    )
}