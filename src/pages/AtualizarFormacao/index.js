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
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.svg";
import api from "../../services/api";
import { AuthContext } from "../../providers/auth";
import { Formik } from "formik";
import * as yup from "yup";


const AtualizarEndereco = () => {
  const { endereco } = React.useContext(AuthContext);
console.log(endereco)
  const cepMask = [/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/]

  const validations = yup.object().shape({
    nomeFormacao: yup.string().max(25,({max})=>`Maximo de ${max} caracteres`).required('Nome é obrigatório'),
    nivelFormacao: yup.string().max(255,({max})=>`Maximo de ${max} caracteres`),
    instituicaoFormacao: yup.string().max(255,({max})=>`Maximo de ${max} caracteres`),
  })

  return (
    <PrincipalDiv>
      <HeaderDiv>
        <Link to="/home" style={{ width: "225px" }}>
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </Link>
        <TituloDiv>
          <Texto>Atualizar formação</Texto>
        </TituloDiv>
        <div style={{ width: "225px", height: "10px" }}></div>
      </HeaderDiv>
      <Formik
        initialValues={{
          nome: endereco.endereco.nome,
          nivel: endereco.endereco.nivel,
          instituicao: endereco.endereco.instituicao,
        }}
        onSubmit={async (values) => {
            console.log(values)
          await api.put(`/enderecos/${endereco.endereco.idEnderecos}`, values);
          alert("Put endereco realizado com sucesso!");
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
            <Mensagem component="span" name="numero" />
            <InputDiv>
            <Label for="nivel">Nível</Label>
            <Input
              name="nivel"
              type="number"
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

export default AtualizarEndereco;
