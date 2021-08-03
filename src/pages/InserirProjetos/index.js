import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
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

const InserirProjetos = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    api.get("/projetos")
      .then((response) => setProjetos(response.data))
      .catch((err) => {
        console.error("ops! ocorrei um erro" + err);
      });
  }, []);

  const handleDate = (props) => {
    const data = new Date(props);
    const dia = (data.getDate() + 1).toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  };
  const projetosMap = projetos.map((p, i) => (
    <CardDiv key={i}>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {p.nome}
          </p>
          <p>
            <b>Descrição: </b>
            {p.descricao}
          </p>
          <p>
            <b>Gerenciamento: </b>
            {p.appGerenciamento}
          </p>
          <p>
            <b>Segmento: </b>
            {p.segmento}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Data de entrega esperada: </b>
            {handleDate(p.dataEntregaEsperada)}
          </p>
          <p>
            <b>Data de entrega: </b>
            {handleDate(p.dataEntrega)}
          </p>
          <p>
            <b>Equipe: </b>
            {p.equipe}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv>
      <BotoesDiv>
        <Button>Inserir projeto</Button>
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
          <Texto>Projetos</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <CardDiv>
        {projetosMap}
      </CardDiv>
    </PrincipalDiv>
  );
};

export default InserirProjetos;
