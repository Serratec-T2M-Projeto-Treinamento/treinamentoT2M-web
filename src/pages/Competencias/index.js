import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import { AuthContext } from "../../providers/auth";
import {
  PrincipalDiv,
  CardColaboradorDiv,
  CardColaboradorDivInterna,
  HeaderDiv,
  TituloDiv,
  Texto,
  BotoesDiv,
  Button,
  CardDiv,
} from "./styles";

const Competencias = () => {
  const history = useHistory();
  const { posicao, setCompetencia } = React.useContext(AuthContext);

  const handleClick = (p) => {
    setCompetencia(p)
    console.log(p);
    history.push('/conhecimentos')
  };

  const posicaoMap = posicao.setPosComps.map((p, i) => (
    <CardDiv key={i}>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {p.competencia.nome}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
        <p>
            <b>Descrição: </b>
            {p.competencia.descricao}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv>
      <BotoesDiv>
        <Button onClick={() => handleClick(p)}>Conhecimentos</Button>
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
          <Texto>{posicao.nome}: Competências</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <CardDiv>{posicaoMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default Competencias;
