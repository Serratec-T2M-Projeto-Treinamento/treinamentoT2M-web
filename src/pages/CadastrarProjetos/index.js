import React from "react";
import {
  PrincipalDiv,
  HeaderDiv,
  TituloDiv,
  Texto,
  Input,
  Formulario,
  ButtonDiv,
  Button,
  Mensagem,
  InputDiv,
  Label,
} from "./styles";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { Formik } from "formik";
import * as yup from "yup";

const CadastrarProjetos = () => {

  const validations = yup.object().shape({
    nome: yup.string().max(25,({max})=>`Maximo de ${max} caracteres`).required('Nome é obrigatório'),
    descricao: yup.string().max(255,({max})=>`Maximo de ${max} caracteres`),
    appGerenciamento: yup.string().max(255,({max})=>`Maximo de ${max} caracteres`),
    segmento: yup.string().max(50,({max})=>`Maximo de ${max} caracteres`),
    dataEntregaEsperada: yup.date('Inserir data válida').required('Data de entrega esperada é obrigatório'),
    dataEntrega: yup.date('Inserir data válida'),
    equipe: yup.number().positive('Inserir número positvo').integer('Inserir número inteiro'),
  })

  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Cadastro de projetos</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <Formik
        initialValues={{
          nome: "",
          descricao: "",
          appGerenciamento: "",
          segmento: "",
          dataEntregaEsperada: "",
          dataEntrega: "",
          equipe: ""
        }}
        onSubmit={async (values) => {

          await api.post("/projetos", values);
          alert("Post endereco realizado com sucesso!");
        }}
        validationSchema={validations}
      >
        <Formulario>
          <Mensagem component="span" name="nome" />
          <InputDiv>
            <Label for="nome">Nome</Label>
            <Input
              name="nome"
              type="text"
              placeholder="Nome"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="descricao" />
            <InputDiv>
            <Label for="descricao">Descrição</Label>
            <Input
              name="descricao"
              type="text"
              placeholder="Descrição"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="appGerenciamento"/>
            <InputDiv>
            <Label for="appGerenciamento">Gerenciamento</Label>
            <Input
              name="appGerenciamento"
              type="text"
              placeholder="Gerenciamento"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="segmento" />
            <InputDiv>
            <Label for="segmento">Segmento</Label>
            <Input
              name="segmento"
              type="text"
              placeholder="Segmento"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="dataEnregaEsperada" />
            <InputDiv>
            <Label for="dataEntregaEsperada">Data de entrega esperada</Label>
            <Input
              name="dataEntregaEsperada"
              type="date"
              placeholder="Data de entrega esperada"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="dataEntrega" />
            <InputDiv>
            <Label for="dataEntrega">Data de entrega</Label>
            <Input
              name="dataEntrega"
              type="date"
              placeholder="Data de entrega"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="equipe" />
            <InputDiv>
            <Label for="equipe">Equipe</Label>
            <Input
              name="equipe"
              type="number"
              placeholder="Equipe"
            ></Input>
            </InputDiv>
          <ButtonDiv>
            <Button type="submit">Cadastrar</Button>
          </ButtonDiv>
        </Formulario>
      </Formik>
    </PrincipalDiv>
  );
};

export default CadastrarProjetos;
