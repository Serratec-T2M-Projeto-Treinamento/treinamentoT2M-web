import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const InserirProjetos = () => {
  const { colaborador } = React.useContext(AuthContext);
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    api
      .get("/projetos")
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
      <Formik
        initialValues={{
          nomeCertificacao: "",
          instituicaoCertificacao: "",
          tempoValidade:"",
        }}
        onSubmit={async (values) => {
          await api.put(
            `/colabsProjs/colaborador/${colaborador.idColaboradores}/projetoAInserir/${p.idProjetos}/funcao/${values.funcao}/dataInicio/${values.dataInicio}`
          );
          alert("Put realizado com sucesso!");
        }}
      >
        <Formulario>
          <Mensagem component="span" name="nomeCertificacao" />
          <InputDiv>
            <Label for="nomeCertificacao">Nome da certificação</Label>
            <Input name="nomeCertificacao" type="text" placeholder="Nome da certificação"></Input>
          </InputDiv>
          <Mensagem component="span" name="instituicaoCertificacao" />
          <InputDiv>
            <Label for="instituicaoCertificacao">Instituição da certificação</Label>
            <Input
              name="instituicaoCertificacao"
              type="date"
              placeholder="Instituição de certificação"
            ></Input>
          </InputDiv>
          <InputDiv>
            <Label for="tempoValidade">Tempo de validade</Label>
            <Input
              name="tempoValidade"
              type="date"
              placeholder="tempoValidade"
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
      <CardDiv>{projetosMap}</CardDiv>
    </PrincipalDiv>
  );
};

export default InserirProjetos;
