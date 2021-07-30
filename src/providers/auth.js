import React,{useState} from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    const [colaborador, setColaborador] = useState({});
    const [isAdmin, setIsAdmin] = useState(0);
    
    return (
        <AuthContext.Provider 
        value={{ 
            colaborador,setColaborador:(colaborador)=>setColaborador(colaborador),
            isAdmin,setIsAdmin:(isAdmin)=>setIsAdmin(isAdmin)
             }}>
            {props.children}
        </AuthContext.Provider>
    )
}