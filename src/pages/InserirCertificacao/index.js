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

const InserirTreinamentos = () => {
  const history = useHistory();
  const { colaborador } = React.useContext(AuthContext);
  const [certificacoes, setCertificacoes] = useState([]);

  useEffect(() => {
    api
      .get("/certificacoes")
      .then((response) => setCertificacoes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const certificacoesMap = certificacoes.map((p, i) => (
    <CardDiv key={i}>
      <CardColaboradorDiv>
        <CardColaboradorDivInterna>
          <p>
            <b>Nome: </b>
            {p.nomeCertificado}
          </p>
          <p>
            <b>Instituição: </b>
            {p.instituicaoCertificado}
          </p>
        </CardColaboradorDivInterna>
        <CardColaboradorDivInterna>
          <p>
            <b>Validade: </b>
            {p.tempoValidade}
          </p>
        </CardColaboradorDivInterna>
      </CardColaboradorDiv>
      <Formik
        initialValues={{
          dataObtencao: "",
        }}
        onSubmit={async (values) => {
            await api.put(`/colabsCerts/colaborador/${colaborador.idColaboradores}/certificacaoAInserir/${p.idCertificacoes}`,values);
            alert("Atualização realizada com sucesso!");
            history.push("/colaborador")
        }}
      >
        <Formulario>
          <Mensagem component="span" name="dataObtencao" />
          <InputDiv>
            <Label for="dataObtencao">Data de obtenção</Label>
            <Input
              name="dataObtencao"
              type="date"
              placeholder="Data de obtenção"
            ></Input>
          </InputDiv>
          <BotoesDiv>
          <Button type="submit">Inserir certificação</Button>
        </BotoesDiv>
        </Formulario>   
      </Formik>
    </CardDiv>
  ));
  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Certificações</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <CardDiv>{certificacoesMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default InserirTreinamentos;
