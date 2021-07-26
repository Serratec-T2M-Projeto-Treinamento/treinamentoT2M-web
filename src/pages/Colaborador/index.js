import React from "react";
import { AuthContext } from "../../providers/auth";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import { PrincipalDiv, CardColaboradorDiv, HeaderDiv, TituloDiv, Texto } from "./styles";

const Colaborador = () => {
  const { colaborador } = React.useContext(AuthContext);
  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Informações do Colaborador(a)</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <CardColaboradorDiv>
        <p><b>Nome: </b>{colaborador.nome}</p>
        <p><b>Usuário: </b>{colaborador.usuario}</p>
        <p><b>CPF: </b>{colaborador.cpf}</p>
        <p><b>Email: </b>{colaborador.email}</p>
        <p><b>Data de nascimento: </b>{colaborador.dataNascimento}</p>
        <p><b>Rua: </b>{colaborador.endereco.rua}</p>
        <p><b>Número: </b>{colaborador.endereco.numero}</p>
        <p><b>Complemento: </b>{colaborador.endereco.complemento}</p>
        <p><b>Bairro: </b>{colaborador.endereco.bairro}</p>
        <p><b>Cidade: </b>{colaborador.endereco.cidade}</p>
        <p><b>Estado: </b>{colaborador.endereco.estado}</p>
        <p><b>CEP: </b>{colaborador.endereco.cep}</p>
      </CardColaboradorDiv>
    </PrincipalDiv>
  );
};

export default Colaborador;
