import React from 'react';
import { AuthContext } from '../../providers/auth';
import { PrincipalDiv, CardColaboradorDiv } from './styles';

const Colaborador = () => {
    const{ colaborador } = React.useContext(AuthContext);
    return (
        <PrincipalDiv>
        <CardColaboradorDiv>
            <p>{colaborador.id}</p>
            <p>{colaborador.nome}</p>
            <p>{colaborador.cpf}</p>
        </CardColaboradorDiv>
        </PrincipalDiv>
    );
}

export default Colaborador;
