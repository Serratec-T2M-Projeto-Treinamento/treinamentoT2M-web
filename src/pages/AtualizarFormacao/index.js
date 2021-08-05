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
  InputMask,
  Label,
  InputDiv,
  Select,
} from "./styles";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import * as yup from "yup";


const AtualizarFormacao = () => {
  const history = useHistory();
  const { formacao } = React.useContext(AuthContext);

  const validations = yup.object().shape({
    nome: yup.string().max(100,({max})=>`Maximo de ${max} caracteres`).required('Rua é obrigatório'),
    nivel: yup.string().max(30,({max})=>`Maximo de ${max} caracteres`).required('Numero é obrigatório'),
    instituicao: yup.string().max(15,({max})=>`Maximo de ${max} caracteres`),
  })

  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Atualização do endereço</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <Formik
        initialValues={{
          nome: formacao.formacao.nome,
          nivel: formacao.formacao.nivel,
          instituicao: formacao.formacao.instituicao,
        }}
        onSubmit={async (values) => {
          await api.put(`/formacoes/${formacao.formacao.idFormacoes}`, values);
          alert("Put formação realizado com sucesso!");
          history.push("/colaborador")
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
            <Mensagem component="span" name="nivel" />
            <InputDiv>
            <Label for="nivel">Nível</Label>
            <Input
              name="nivel"
              type="text"
              placeholder="Nível"
            ></Input>
            </InputDiv>
            <Mensagem component="span" name="instituicao"/>
            <InputDiv>
            <Label for="instituicao">Instituição</Label>
            <Input
              name="instituicao"
              type="text"
              placeholder="Instituição"
            ></Input>
            </InputDiv>
          <ButtonDiv>
            <Button type="submit">Atualizar</Button>
          </ButtonDiv>
        </Formulario>
      </Formik>
    </PrincipalDiv>
  );
};

export default AtualizarFormacao;
