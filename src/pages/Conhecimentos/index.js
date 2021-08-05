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
  Formulario,
  Input,
  InputDiv,
  Mensagem,
  Label,
} from "./styles";

const Conhecimentos = () => {
  const history = useHistory();
  const { posicao,setPosicao } = React.useContext(AuthContext);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {    
    api.get(`/posicoes/${posicao.idPosicoes}`)
    .then((response) => setPosicao(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }, [refresh]);

  const handleClick = () => {
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
        <Button onClick={() => handleClick()}>Conhecimentos</Button>
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
          <Texto>Competências: {posicao.nome}</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <CardDiv>{posicaoMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default Conhecimentos;
