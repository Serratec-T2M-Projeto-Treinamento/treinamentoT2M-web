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
  const { posicao, setPosicao } = React.useContext(AuthContext);
  const [competencias, setCompetencias] = useState([]);

  useEffect(() => {
    api
      .get("/competencias")
      .then((response) => setCompetencias(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  async function handleClick(p) {
    console.log(posicao);
    console.log(p);
    await api.put(`/posComps/posicao/${posicao.idPosicoes}/competenciaAInserir/${p.idCompetencias}`)
    alert('Competência inserida com sucesso!')
    const responsePosicao = await api.get(`/posicoes/${posicao.idPosicoes}`);
    setPosicao(responsePosicao.data)
    history.push('/competencias')
  };

  const competenciasMap = competencias.map((p, i) => (
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
        <Button onClick={() => handleClick(p)}>Inserir competência</Button>
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
          <Texto>Competências</Texto>
        </TituloDiv>
      </HeaderDiv>
      <CardDiv>{competenciasMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default InserirConhecimento;
