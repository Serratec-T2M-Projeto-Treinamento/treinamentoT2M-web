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

const InserirConhecimento = () => {
  const history = useHistory();
  const { competencia, setCompetencia } = React.useContext(AuthContext);
  const [conhecimentos, setConhecimentos] = useState([]);

  useEffect(() => {
    api
      .get("/competencias")
      .then((response) => setConhecimentos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  async function handleClick(p) {
    console.log(competencia);
    console.log(p);
    await api.put(`/compsCons/competencia/${competencia.competencia.idCompetencias}/conhecimentoAInserir/${p.idConhecimentos}`)
    alert('Conhecimento inserido com sucesso!')
    const responseCompetencia = await api.get(`/competencia/${competencia.competencia.idCompetencias}`);
    setCompetencia(competencia.responseCompetencia.data)
    console.log(responseCompetencia);
    history.push('/conhecimentos')
  };

  const competenciaMap = competencia.setCompsCons.map((p, i) => (
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
        <Button onClick={() => handleClick(p)}>Inserir conhecimento</Button>
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
          <Texto>Conhecimentos</Texto>
        </TituloDiv>
      </HeaderDiv>
      <CardDiv>{competenciaMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default InserirConhecimento;
