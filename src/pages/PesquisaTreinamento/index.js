import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
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
import { LinkButton } from "../../components/LinkButton/styles";

const PesquisaTreinamento = () => {
  const history = useHistory();
  const { setPosicao } = React.useContext(AuthContext);
  const [posicoes, setPosicoes] = useState([]);

  useEffect(() => {
    api
      .get("/posicoes")
      .then((response) => setPosicoes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const handleClick = (p) => {
    setPosicao(p)
    history.push('/competencias')
  };

  const posicoesMap = posicoes.map((p, i) => (
    <CardDiv key={i}>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {p.nome}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
        <p>
            <b>Descrição: </b>
            {p.descricao}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv>
      <BotoesDiv>
        <Button onClick={() => handleClick(p)}>Requisitos para ocupação</Button>
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
          <Texto>Posições</Texto>
        </TituloDiv>
        <LinkButton to='/cadastrarposicoes'>Cadastrar posição</LinkButton>
      </HeaderDiv>
      <CardDiv>{posicoesMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default PesquisaTreinamento;
