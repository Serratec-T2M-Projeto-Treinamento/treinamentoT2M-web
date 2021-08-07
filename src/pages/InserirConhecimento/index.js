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
    <DivPrincipal>
      <DivHeader>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <DivTitulo>
          <Titulos>Conhecimentos</Titulos>
        </DivTitulo>
      </DivHeader>
      <CardDiv>{competenciaMap}</CardDiv>
    </DivPrincipal>
  );
};

export default InserirConhecimento;
