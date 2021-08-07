import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import {
  CardColaboradorDiv,
  CardColaboradorDivInterna,
  BotoesDiv,
  Button,
  CardDiv,
} from "./styles";
import { LinkButton } from "../../components/LinkButton/styles";
import { DivPrincipal } from "../../components/DivPrincipal/styles";
import { DivHeader } from "../../components/DivHeader/styles"
import { DivTitulo } from "../../components/DivTitulo/styles";
import { Titulos } from "../../components/Titulos/styles";

const Treinamentos = () => {
  const history = useHistory();
  const { conhecimento } = React.useContext(AuthContext);
  console.log(conhecimento);


  const treinamentos = conhecimento.conhecimento.setConsTrns.map((p, i) => (
    <CardDiv key={i}>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {p.treinamento.nome}
          </p>
          <p>
            <b>Instituição: </b>
            {p.treinamento.instituicao}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Carga Horaria: </b>
            {p.treinamento.cargaHoraria}h
          </p>
          <p>
            <b>Descricao: </b>
            {p.treinamento.descricao}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv>
      <BotoesDiv>
        <Button>Inserir treinamento</Button>
      </BotoesDiv>
      {/* <BotoesDiv>
        <Button onClick={() => handleRequisitos(p)}>Requisitos para ocupação</Button>
      </BotoesDiv> */}
    </CardDiv>
  ));
  return (
    <DivPrincipal>
      <DivHeader>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <DivTitulo>
          <Titulos>Treinamentos</Titulos>
        </DivTitulo>
        <LinkButton to='/cadastrartreinamentos'>Cadastrar treinamentos</LinkButton>
        <LinkButton to='/inserirtreinamento'>Inserir treinamento</LinkButton>
      </DivHeader>
      <CardDiv>{treinamentos}</CardDiv>
    </DivPrincipal>
  );
};

export default Treinamentos;
