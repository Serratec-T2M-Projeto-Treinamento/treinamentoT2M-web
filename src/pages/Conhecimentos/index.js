import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import { LinkButton } from "../../components/LinkButton/styles";
import { AuthContext } from "../../providers/auth";
import {
  PrincipalDiv,
  CardColaboradorDiv,
  CardColaboradorDivInterna,
  HeaderDiv,
  TituloDiv,
  Texto,
  CardDiv,
  BotoesDiv,
  Button
} from "./styles";

const Conhecimentos = () => {
  const history = useHistory();
  const { competencia, setConhecimento } = React.useContext(AuthContext);

  const handleClick = (p) => {
    console.log(p);
    setConhecimento(p);
    history.push('/treinamentos')
  };

  const posicaoMap = competencia.competencia.setCompsCons.map((p, i) => (
    <CardDiv key={i}>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {p.conhecimento.nome}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Descrição: </b>
            {p.conhecimento.descricao}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv>
      <BotoesDiv>
        <Button onClick={() => handleClick(p)}>Possiveis Treinamentos</Button>
      </BotoesDiv>
    </CardDiv>
  ));
  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>{competencia.competencia.nome}: Conhecimentos </Texto>
        </TituloDiv>
        <LinkButton to='/cadastrarconhecimentos'>Cadastrar conhecimentos</LinkButton>
        <LinkButton to='/inserirconhecimento'>Inserir conhecimentos</LinkButton>
      </HeaderDiv>
      <CardDiv>{posicaoMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default Conhecimentos;
